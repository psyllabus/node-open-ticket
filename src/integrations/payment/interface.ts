export interface PaymentIntegration {
    pay(amount: number, currency: string, description: string, token: string): Promise<string>;
}
