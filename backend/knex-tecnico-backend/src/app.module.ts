import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { DonorsModule } from './donors/donors.module';
import { PaymentsModule } from './payments/payments.module';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [DonorsModule, DonationsModule, PaymentsModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
