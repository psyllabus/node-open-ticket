import { Ticket } from "../../src/services/tickets/types";

export const data: Ticket[] = [{
    _id: 'my-ticket-id-1',
    event_id: 'my-event',
    ticket_group_id: 'my-ticket-group',
    attendee_id: 'my-attendee',
    date_purchase: new Date("2019-11-02T21:00:00.000Z"),
    stripe_charge_id: 'mock-stripe-charge',
    price: 99.99,
    attendee_name: 'Romain G',
    attendee_email: 'rom1guyot@gmail.com'
}, {
    _id: 'my-ticket-id-1',
    event_id: 'my-event-updated',
    ticket_group_id: 'my-ticket-group-updated',
    attendee_id: 'my-attendee-updated',
    date_purchase: new Date("2019-11-02T22:00:00.000Z"),
    stripe_charge_id: 'mock-stripe-charge-updated',
    price: 100,
    attendee_name: 'Romain Guyot',
    attendee_email: 'rom2guyot@gmail.com'
}, {
    _id: 'my-ticket-id-2',
    event_id: 'my-event-2',
    ticket_group_id: 'my-ticket-group-2',
    attendee_id: 'my-attendee-2',
    date_purchase: new Date("2019-11-12T21:00:00.000Z"),
    stripe_charge_id: 'mock-stripe-charge-2',
    price: 199.99,
    attendee_name: 'Hiestaa',
    attendee_email: 'hello@world.next'
}];
