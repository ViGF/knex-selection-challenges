import { Module } from '@nestjs/common';
import { DonorsController } from './donors.controller';
import { DonorsRepository } from './repositories/donors-repository';
import { DonorsPrismaRepository } from './repositories/impl/donors-prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [DonorsController],
  providers: [
    PrismaService,
    {
      provide: DonorsRepository,
      useClass: DonorsPrismaRepository
    },
  ],
})
export class DonorsModule {}
