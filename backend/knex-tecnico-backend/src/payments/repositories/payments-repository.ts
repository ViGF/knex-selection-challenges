import { CreatePaymentDto } from "../dto/create-payment.dto";
import { UpdatePaymentDto } from "../dto/update-payment.dto";
import { Payment } from "../entities/payment.entity";

export abstract class PaymentsRepository {
    abstract create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    abstract findByDonation(donationId: string): Promise<Payment>;
    abstract update(id: string, updateDonorDto: UpdatePaymentDto): Promise<Payment>;
}