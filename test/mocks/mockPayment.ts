import { PaymentIntegration } from "../../src/integrations/payment/interface";

export class MockPayment implements PaymentIntegration {
    fail: boolean;
    paymentId: string;

    constructor() {
        this.paymentId = '123456789'
        this.fail = false;
    }

    pay(amount: number, currency: string, description: string, token: string) {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => (this.fail ?
                reject(new Error(this.fail.toString())) :
                resolve(this.paymentId)),
            100);
        });
    }
}
