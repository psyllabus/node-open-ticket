export interface TicketGroup {
    _id?: string;
    event_id: string;
    name: string;
    description?: string;
    is_limited: boolean;
    limit: number;
    price: number;
    currency: string;
    sale_open: Date;
    sale_close?: Date;
};
