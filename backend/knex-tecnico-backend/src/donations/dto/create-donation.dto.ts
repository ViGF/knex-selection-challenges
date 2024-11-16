import {
  IsNotEmpty,
  IsUUID,
  Min,
  Max,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  @Max(10000)
  value: number;

  @IsOptional()
  @MaxLength(200)
  message: string;

  @IsOptional()
  @IsUUID()
  paymentId: string;

  @IsNotEmpty()
  @IsUUID()
  donorId: string;
}
