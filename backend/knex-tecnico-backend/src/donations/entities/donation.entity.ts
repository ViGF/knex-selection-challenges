export class Donation {
    id: string;
    value: number;
    message: string;
    status: 'CONFIRMED' | 'PENDING' | 'CANCELED';
    createdAt: Date;
    confirmedAt: Date;
    paymentId: string;
    donorId: string;
};