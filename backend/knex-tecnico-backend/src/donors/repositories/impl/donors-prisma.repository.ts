import { CreateDonorDto } from 'src/donors/dto/create-donor.dto';
import { UpdateDonorDto } from 'src/donors/dto/update-donor.dto';
import { Donor } from 'src/donors/entities/donor.entity';
import { DonorsRepository } from '../donors-repository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DonorsPrismaRepository implements DonorsRepository {
  constructor(private prisma: PrismaService) {}

  create(createDonorDto: CreateDonorDto) {
    return this.prisma.donor.create({
      data: createDonorDto,
      include: {
        donations: true
      }
    }) as unknown as Promise<Donor>;
  }

  findOne(id: string) {
    return this.prisma.donor.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        donations: true
      }
    }) as unknown as Promise<Donor>;
  }

  update(id: string, updateDonorDto: UpdateDonorDto) {
    return this.prisma.donor.update({
      where: {
        id,
      },
      data: updateDonorDto,
      include: {
        donations: true
      }
    }) as unknown as Promise<Donor>;
  }
}
