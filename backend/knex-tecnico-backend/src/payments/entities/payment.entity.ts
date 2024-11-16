import { Donation } from "src/donations/entities/donation.entity";

export class Payment {
  id: string;
  pix_key?: string;
  qr_code: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELED';
  createdAt: Date;
  expiresAt: Date;
  confirmedAt: Date;
  donation: Donation
}
