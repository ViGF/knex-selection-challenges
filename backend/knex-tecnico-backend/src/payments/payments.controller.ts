import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsRepository } from './repositories/payments-repository';

@Controller('/payments')
export class PaymentsController {
  constructor(private paymentsRepository: PaymentsRepository) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentsRepository.create(createPaymentDto);
    } catch (error) {
      throw new BadRequestException([error.message], {
        cause: error,
      });
    }
  }
}
