import { Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsRepository } from './repositories/donations-repository';
import { DonationsPrismaRepository } from './repositories/impl/donations-prisma.repository';
import { PaymentsRepository } from 'src/payments/repositories/payments-repository';
import { PaymentsPrismaRepository } from 'src/payments/repositories/impl/payments-prisma.repository';
import { PaymentGateway } from 'src/gateways/payment-gateway';
import { PaymentGatewayExample } from 'src/gateways/impl/payment-gateway-example';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [DonationsController],
  providers: [
    PrismaService,
    {
      provide: DonationsRepository,
      useClass: DonationsPrismaRepository
    },
    {
      provide: PaymentsRepository,
      useClass: PaymentsPrismaRepository
    },
    {
      provide: PaymentGateway,
      useClass: PaymentGatewayExample
    }
  ],
})
export class DonationsModule {}
