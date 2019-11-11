export interface Ticket {
    _id?: string;
    eventId: string;
    ticketGroupId: string;
    attendeeId: string;
    datePurchase: Date;
    paymentId: string;
    paymentToken: string;
    price: number;  // From related ticket group
    attendeeName: string;  // from related attendee
    attendeeEmail: string;  // from related attendee
};
