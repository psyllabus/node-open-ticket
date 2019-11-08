import { Ticket } from "../../src/services/tickets/types";
import { Event } from "../../src/services/events/types";
import { TicketGroup } from "../../src/services/ticketGroups/types";
import { Attendee } from "../../src/services/attendees/types";

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
    event_id: 'my-event',
    ticket_group_id: 'my-ticket-group',
    attendee_id: 'my-attendee-updated',
    date_purchase: new Date("2019-11-02T22:00:00.000Z"),
    stripe_charge_id: 'mock-stripe-charge-updated',
    price: 100,
    attendee_name: 'Romain Guyot',
    attendee_email: 'rom2guyot@gmail.com'
}, {
    _id: 'my-ticket-id-2',
    event_id: 'my-event',
    ticket_group_id: 'my-ticket-group',
    attendee_id: 'my-attendee',
    date_purchase: new Date("2019-11-12T21:00:00.000Z"),
    stripe_charge_id: 'mock-stripe-charge-2',
    price: 199.99,
    attendee_name: 'Hiestaa',
    attendee_email: 'hello@world.next'
}];

export const dependencies: { events: Event[], ticketGroups: TicketGroup[], attendees: Attendee[] } = {
    events: [{
        "_id": "my-event",
        "name": "My Event",
        "start": new Date("2019-11-01T20:00:00.000Z"),
        "end": new Date("2019-11-02T03:00:00.000Z")
    },{
        "_id": "my-event-2",
        "name": "My Event",
        "start": new Date("2019-11-01T20:00:00.000Z"),
        "end": new Date("2019-11-02T03:00:00.000Z")
    }],
    ticketGroups: [{
        "_id": "my-ticket-group",
        "event_id": "my-event-2",
        "name": "some Ticket Group",
        "description": "some group of tickets for my event",
        "is_limited": false,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "sale_open": new Date("2019-11-01T20:00:00.000Z"),
        "sale_close": new Date("2019-11-02T03:00:00.000Z")
    }],
    attendees: [{
        "_id": "my-attendee",
        "name": "An Attendee",
        "email": "an@attendee.com"
    }]
};
