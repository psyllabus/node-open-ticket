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
    stripe_token: 'my-token',
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
    stripe_token: 'my-token',
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
    stripe_token: 'my-token',
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
    },{
        "_id": "my-attendee-updated",
        "name": "An Attendee Updated",
        "email": "an@attendee.update.com"
    }]
};

export const missingDependencies: { event: Ticket, ticketGroup: Ticket, attendee: Ticket } = {
    event: {
        _id: 'my-invalid-ticket-id-1',
        event_id: 'my-non-existing-event',
        ticket_group_id: 'my-ticket-group',
        attendee_id: 'my-attendee',
        date_purchase: new Date("2019-11-02T21:00:00.000Z"),
        stripe_charge_id: 'mock-stripe-charge',
        stripe_token: 'my-token',
        price: 99.99,
        attendee_name: 'Romain G',
        attendee_email: 'rom1guyot@gmail.com'
    },

    ticketGroup: {
        _id: 'my-invalid-ticket-id-2',
        event_id: 'my-event',
        ticket_group_id: 'my-non-existing-ticket-group',
        attendee_id: 'my-attendee',
        date_purchase: new Date("2019-11-02T21:00:00.000Z"),
        stripe_charge_id: 'mock-stripe-charge',
        stripe_token: 'my-token',
        price: 99.99,
        attendee_name: 'Romain G',
        attendee_email: 'rom1guyot@gmail.com'
    },

    attendee: {
        _id: 'my-invalid-ticket-id-3',
        event_id: 'my-event',
        ticket_group_id: 'my-ticket-group',
        attendee_id: 'my-non-existing-attendee',
        date_purchase: new Date("2019-11-02T21:00:00.000Z"),
        stripe_charge_id: 'mock-stripe-charge',
        stripe_token: 'my-token',
        price: 99.99,
        attendee_name: 'Romain G',
        attendee_email: 'rom1guyot@gmail.com'
    }
}

export const invalidItems: {[key: string]: Ticket } = {
    'missing stripe token': {
        _id: 'my-invalid-ticket-id-4',
        event_id: 'my-event',
        ticket_group_id: 'my-ticket-group',
        attendee_id: 'my-attendee',
        date_purchase: new Date("2019-11-12T21:00:00.000Z"),
        stripe_charge_id: 'mock-stripe-charge-2',
        stripe_token: '',
        price: 199.99,
        attendee_name: 'Hiestaa',
        attendee_email: 'hello@world.next'
    },
    'missing stripe charges': {
        _id: 'my-invalid-ticket-id-5',
        event_id: 'my-event',
        ticket_group_id: 'my-ticket-group',
        attendee_id: 'my-attendee',
        date_purchase: new Date("2019-11-12T21:00:00.000Z"),
        stripe_charge_id: '',
        stripe_token: 'some-token',
        price: 199.99,
        attendee_name: 'Hiestaa',
        attendee_email: 'hello@world.next'
    },
    'missing attendee name': {
        _id: 'my-invalid-ticket-id-6',
        event_id: 'my-event',
        ticket_group_id: 'my-ticket-group',
        attendee_id: 'my-attendee',
        date_purchase: new Date("2019-11-12T21:00:00.000Z"),
        stripe_charge_id: 'mock-stripe-charge-2',
        stripe_token: 'mock-token',
        price: 199.99,
        attendee_name: '',
        attendee_email: 'hello@world.next'
    },
    'missing attendee email': {
        _id: 'my-invalid-ticket-id-6',
        event_id: 'my-event',
        ticket_group_id: 'my-ticket-group',
        attendee_id: 'my-attendee',
        date_purchase: new Date("2019-11-12T21:00:00.000Z"),
        stripe_charge_id: 'mock-stripe-charge-2',
        stripe_token: 'mock-token',
        price: 199.99,
        attendee_name: 'Some name',
        attendee_email: ''
    }
}
