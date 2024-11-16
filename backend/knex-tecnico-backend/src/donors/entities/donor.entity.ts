import { Donation } from "src/donations/entities/donation.entity";

export class Donor {
    name: string;
    id: string;
    email: string;
    phone: string;
    createdAt: Date;
    donations: Donation[]
};
