import { IsDate, IsNotEmpty, IsOptional, IsUUID, IsUrl } from 'class-validator';
import { Payment } from '../entities/payment.entity';

export class CreatePaymentDto
  implements
    Omit<Payment, 'id' | 'createdAt' | 'status' | 'expiresAt' | 'donation' | 'pix_key' | 'confirmedAt'>
{
  @IsOptional()
  pix_key?: string;

  @IsNotEmpty()
  @IsUrl()
  qr_code: string;

  @IsOptional()
  @IsDate()
  confirmedAt?: Date;

  @IsNotEmpty()
  @IsUUID()
  donationId: string;
}
