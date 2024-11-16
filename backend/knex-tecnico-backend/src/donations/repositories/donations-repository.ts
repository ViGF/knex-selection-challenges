import { CreateDonationDto } from "../dto/create-donation.dto";
import { UpdateDonationDto } from "../dto/update-donation.dto";
import { Donation } from "../entities/donation.entity";

export abstract class DonationsRepository {
    abstract create(createDonationDto: CreateDonationDto): Promise<Donation>;
    abstract findOne(id: string): Promise<Donation>;
    abstract update(id: string, updateDonationDto: UpdateDonationDto): Promise<Donation>;
    abstract updatePayment(id: string, paymentId: string): Promise<Donation>;
}