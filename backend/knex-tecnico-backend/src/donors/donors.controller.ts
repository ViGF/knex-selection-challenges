import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { DonorsRepository } from './repositories/donors-repository';

@Controller('/donors')
export class DonorsController {
  constructor(private readonly donorsRepository: DonorsRepository) {}

  @Post()
  async create(@Body() createDonorDto: CreateDonorDto) {
    try {
      return await this.donorsRepository.create(createDonorDto);
    } catch (error) {
      let message = error.message
      if (error.code == 'P2002') {
        message = 'Donor with email already exists.'
      }

      throw new BadRequestException([message], {
        cause: error,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.donorsRepository.findOne(id);
    } catch (error) {
      let message = error.message
      if (error.code == 'P2025') {
        message = 'No Donor found.'
      }

      throw new BadRequestException([message], {
        cause: error,
      });
    }
  }

  @Get(':id/donations')
  async findDonations(@Param('id') id: string) {
    try {
      return (await this.donorsRepository.findOne(id)).donations;
    } catch (error) {
      let message = error.message
      if (error.code == 'P2025') {
        message = 'No Donor found.'
      }

      throw new BadRequestException([message], {
        cause: error,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDonorDto: UpdateDonorDto,
  ) {
    try {
      return await this.donorsRepository.update(id, updateDonorDto);
    } catch (error) {
      let message = error.message
      if (error.code == 'P2025') {
        message = 'No Donor found.'
      } else if (error.code == 'P2002') {
        message = 'Donor with email already exists.'
      }

      throw new BadRequestException([message], {
        cause: error,
      });
    }
  }
}
