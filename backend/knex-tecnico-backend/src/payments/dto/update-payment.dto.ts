import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsIn, IsOptional } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @IsOptional()
    @IsIn(['CONFIRMED', 'PENDING', 'CANCELED'])
    status?: 'CONFIRMED' | 'PENDING' | 'CANCELED';
}
