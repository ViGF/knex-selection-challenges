import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository } from './repositories/payments-repository';
import { PaymentsPrismaRepository } from './repositories/impl/payments-prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PrismaService,
    {
      provide: PaymentsRepository,
      useClass: PaymentsPrismaRepository,
    },
  ],
})
export class PaymentsModule {}
