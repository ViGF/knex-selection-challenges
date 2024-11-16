/**
 * exemplo de gateway de pagamento
 */

export abstract class PaymentGateway {
    /**
     * @param value valor a ser pago
     * @returns link da imagem do qrcode
     */
    abstract generateQrCode(value: number, donationId: string): Promise<string>

    /**
     * @returns retorna pagamento processado
     */
    abstract process(donationId: string): Promise<PaymentGatewayObject>
}

export class PaymentGatewayObject {
    donationId: string
    pix_key: string
    confirmedAt: string
}