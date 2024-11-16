import { Injectable } from "@nestjs/common"
import { PaymentGateway, PaymentGatewayObject } from "../payment-gateway"

@Injectable()
export class PaymentGatewayExample implements PaymentGateway {
    generateQrCode(value: number, donationId: string): Promise<string> {
        return new Promise((resolve) => {
            resolve("https://example.com/qrcode/342355235327")
        })
    }

    process(donationId: string): Promise<PaymentGatewayObject> {
        return new Promise((resolve) => {
            resolve({
                donationId,
                pix_key: '32453453463532',
                confirmedAt: new Date().toISOString()
            })
        })
    }
}