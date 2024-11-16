import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationsRepository } from './repositories/donations-repository';
import { PaymentsRepository } from 'src/payments/repositories/payments-repository';
import { CreateDonationDto } from './dto/create-donation.dto';
import { PaymentGateway } from 'src/gateways/payment-gateway';

@Controller('/donations')
export class DonationsController {
  constructor(
    private readonly donationsRepository: DonationsRepository,
    private paymentsRepository: PaymentsRepository,
    private paymentGateway: PaymentGateway
  ) {}

  /**
   * Cria doação e pagamento
   */
  @Post()
  async create(@Body() createDonationDto: CreateDonationDto) {
    try {
      const donation = await this.donationsRepository.create(createDonationDto);
      const qrCode = await this.paymentGateway.generateQrCode(
        createDonationDto.value,
        donation.id
      );

      const payment = await this.paymentsRepository.create({
        qr_code: qrCode,
        donationId: donation.id,
      })

      this.donationsRepository.updatePayment(donation.id, payment.id)
      
      return {
        ...donation,
        paymentId: payment.id,
        payment: payment
      }
    } catch (error) {
      throw new BadRequestException([error.message], {
        cause: error,
      });
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.donationsRepository.findOne(id);
    } catch (error) {
      let message = error.message;
      if (error.code == 'P2025') {
        message = 'No Donation found.';
      }

      throw new BadRequestException([message], {
        cause: error,
      });
    }
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    try {
      return await this.donationsRepository.update(id, updateDonationDto);
    } catch (error) {
      let message = error.message;
      if (error.code == 'P2025') {
        message = 'No Donation found.';
      }

      throw new BadRequestException([message], {
        cause: error,
      });
    }
  }

  @Put('/:id/cancel')
  async cancel(@Param('id') id: string) {
    try {
      return await this.donationsRepository.update(id, { status: 'CANCELED' });
    } catch (error) {
      let message = error.message;
      if (error.code == 'P2025') {
        message = 'No Donation found.';
      }

      throw new BadRequestException([message], {
        cause: error,
      });
    }
  }

  /**
   * Verifica se pagamento foi confirmado pelo gateway e atualiza status
   */
  @Get('/:donationId/confirm')
  async confirm(@Param('donationId') donationId: string) {
    try {
      const payment = await this.paymentsRepository.findByDonation(donationId);
      const paymentGatewayObject = await this.paymentGateway.process(donationId);

      if (paymentGatewayObject.confirmedAt) {
        // Add 3 hous to fix timezone
        const expiresAt = new Date(new Date(payment.expiresAt).getTime() + 3 * 60 * 60 * 1000)

        if (expiresAt.getTime() > new Date().getTime()) {
          await Promise.all([
            this.paymentsRepository.update(payment.id, {
              status: 'CONFIRMED',
              confirmedAt: new Date(paymentGatewayObject.confirmedAt),
              pix_key: paymentGatewayObject.pix_key
            }),
            this.donationsRepository.update(payment.donation.id, {
              status: 'CONFIRMED',
              confirmedAt: new Date(paymentGatewayObject.confirmedAt),
            })
          ])

          return await this.paymentsRepository.findByDonation(donationId);
        } else {
          throw new Error('payment already expired.');
        }
      }

      return payment
    } catch (error) {
      throw new BadRequestException([error.message], {
        cause: error,
      });
    }
  }
}
