export interface Ticket {
    _id?: string;
    event_id: string;
    ticket_group_id: string;
    attendee_id: string;
    date_purchase: Date;
    stripe_charge_id: string;
    stripe_token: string;
    price: number;  // From related ticket group
    attendee_name: string;  // from related attendee
    attendee_email: string;  // from related attendee
};
