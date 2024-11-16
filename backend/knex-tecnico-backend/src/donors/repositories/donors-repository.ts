import { CreateDonorDto } from "../dto/create-donor.dto";
import { UpdateDonorDto } from "../dto/update-donor.dto";
import { Donor } from "../entities/donor.entity";

export abstract class DonorsRepository {
    abstract create(createDonorDto: CreateDonorDto): Promise<Donor>;
    abstract findOne(id: string): Promise<Donor>;
    abstract update(id: string, updateDonorDto: UpdateDonorDto): Promise<Donor>;
}