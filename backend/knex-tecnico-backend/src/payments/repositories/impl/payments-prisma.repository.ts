import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../payments-repository';
import { CreatePaymentDto } from 'src/payments/dto/create-payment.dto';
import { Payment } from 'src/payments/entities/payment.entity';
import { UpdatePaymentDto } from 'src/payments/dto/update-payment.dto';

@Injectable()
export class PaymentsPrismaRepository implements PaymentsRepository {
  constructor(private prisma: PrismaService) {}

  create(createPaymentDto: CreatePaymentDto) {
    const donationId = createPaymentDto.donationId;
    delete createPaymentDto.donationId;

    return this.prisma.payment.create({
      data: {
        ...createPaymentDto,
        donation: {
          connect: {
            id: donationId
          }
        }
      }
    }) as unknown as Promise<Payment>;
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: {
        id,
      },
      data: updatePaymentDto,
    }) as unknown as Promise<Payment>;
  }

  findByDonation(donationId: string) {
    return this.prisma.payment.findFirstOrThrow({
      where: {
        donation: {
          id: donationId
        }
      },
      include: {
        donation: true
      }
    }) as unknown as Promise<Payment>
  }
}
