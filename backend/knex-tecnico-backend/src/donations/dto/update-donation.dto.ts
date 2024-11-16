import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Donation } from '../entities/donation.entity';
import { IsDate, IsIn, IsOptional } from 'class-validator';
import { CreateDonationDto } from './create-donation.dto';

export class UpdateDonationDto extends PartialType(OmitType(CreateDonationDto, ['donorId', 'paymentId'])) {
    @IsOptional()
    @IsIn(["CONFIRMED", "PENDING", "CANCELED"])
    status?: typeof Donation.prototype.status;

    @IsOptional()
    @IsDate()
    confirmedAt?: Date
}