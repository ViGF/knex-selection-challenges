import { IsNotEmpty, Length, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { Donor } from '../entities/donor.entity';

export class CreateDonorDto implements Omit<Donor, 'id' | 'createdAt' | 'donations'> {
  @IsNotEmpty()
  @Length(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phone: string;
}
