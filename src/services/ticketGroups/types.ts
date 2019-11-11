export interface TicketGroup {
    _id?: string;
    eventId: string;
    name: string;
    description?: string;
    isLimited: boolean;
    limit: number;
    price: number;
    currency: string;
    saleOpen: Date;
    saleClose?: Date;
};
