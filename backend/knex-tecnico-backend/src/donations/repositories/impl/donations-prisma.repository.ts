import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { DonationsRepository } from '../donations-repository';
import { Donation } from 'src/donations/entities/donation.entity';
import { UpdateDonationDto } from 'src/donations/dto/update-donation.dto';
import { CreateDonationDto } from 'src/donations/dto/create-donation.dto';
import { $Enums } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DonationsPrismaRepository implements DonationsRepository {
  constructor(private prisma: PrismaService) {}

  create(createDonorDto: CreateDonationDto) {
    return this.prisma.donation.create({
      data: {
        ...createDonorDto,
        value: createDonorDto.value as unknown as Decimal
      },
    }) as unknown as Promise<Donation>;
  }

  findOne(id: string) {
    return this.prisma.donation.findUniqueOrThrow({
      where: {
        id,
      },
    }) as unknown as Promise<Donation>;
  }

  // findAllByDonor(donorId: string): Promise<Donation[]> {
  //   return this.prisma.donation.findMany({
  //     where: {
  //       donorId
  //     },
  //   });
  // }

  update(id: string, updateDonationDto: UpdateDonationDto) {
    return this.prisma.donation.update({
      where: {
        id,
      },
      data: {
        ...updateDonationDto,
        status: updateDonationDto.status as unknown as $Enums.Status
      },
    }) as unknown as Promise<Donation>;
  }

  updatePayment(id: string, paymentId: string) {
    return this.prisma.donation.update({
      where: {
        id
      },
      data: {
        payment: {
          connect: {
            id: paymentId
          }
        }
      }
    }) as unknown as Promise<Donation>
  }
}
