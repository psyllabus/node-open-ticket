import { Ticket } from "../../src/services/tickets/types";
import { Event } from "../../src/services/events/types";
import { TicketGroup } from "../../src/services/ticketGroups/types";
import { Attendee } from "../../src/services/attendees/types";

export const data: Ticket[] = [{
    _id: 'my-ticket-id-1',
    eventId: 'my-event',
    ticketGroupId: 'my-ticket-group',
    attendeeId: 'my-attendee',
    datePurchase: new Date("2019-11-02T21:00:00.000Z"),
    paymentId: 'mock-stripe-charge',
    paymentToken: 'my-token',
    price: 99.99,
    attendeeName: 'Romain G',
    attendeeEmail: 'rom1guyot@gmail.com'
}, {
    _id: 'my-ticket-id-1',
    eventId: 'my-event',
    ticketGroupId: 'my-ticket-group',
    attendeeId: 'my-attendee-updated',
    datePurchase: new Date("2019-11-02T22:00:00.000Z"),
    paymentId: 'mock-stripe-charge-updated',
    paymentToken: 'my-token',
    price: 100,
    attendeeName: 'Romain Guyot',
    attendeeEmail: 'rom2guyot@gmail.com'
}, {
    _id: 'my-ticket-id-2',
    eventId: 'my-event',
    ticketGroupId: 'my-ticket-group',
    attendeeId: 'my-attendee',
    datePurchase: new Date("2019-11-12T21:00:00.000Z"),
    paymentId: 'mock-stripe-charge-2',
    paymentToken: 'my-token',
    price: 199.99,
    attendeeName: 'Hiestaa',
    attendeeEmail: 'hello@world.next'
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
        "eventId": "my-event-2",
        "name": "some Ticket Group",
        "description": "some group of tickets for my event",
        "isLimited": false,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "saleOpen": new Date("2019-11-01T20:00:00.000Z"),
        "saleClose": new Date("2019-11-02T03:00:00.000Z")
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
        eventId: 'my-non-existing-event',
        ticketGroupId: 'my-ticket-group',
        attendeeId: 'my-attendee',
        datePurchase: new Date("2019-11-02T21:00:00.000Z"),
        paymentId: 'mock-stripe-charge',
        paymentToken: 'my-token',
        price: 99.99,
        attendeeName: 'Romain G',
        attendeeEmail: 'rom1guyot@gmail.com'
    },

    ticketGroup: {
        _id: 'my-invalid-ticket-id-2',
        eventId: 'my-event',
        ticketGroupId: 'my-non-existing-ticket-group',
        attendeeId: 'my-attendee',
        datePurchase: new Date("2019-11-02T21:00:00.000Z"),
        paymentId: 'mock-stripe-charge',
        paymentToken: 'my-token',
        price: 99.99,
        attendeeName: 'Romain G',
        attendeeEmail: 'rom1guyot@gmail.com'
    },

    attendee: {
        _id: 'my-invalid-ticket-id-3',
        eventId: 'my-event',
        ticketGroupId: 'my-ticket-group',
        attendeeId: 'my-non-existing-attendee',
        datePurchase: new Date("2019-11-02T21:00:00.000Z"),
        paymentId: 'mock-stripe-charge',
        paymentToken: 'my-token',
        price: 99.99,
        attendeeName: 'Romain G',
        attendeeEmail: 'rom1guyot@gmail.com'
    }
}

export const invalidItems: {[key: string]: Ticket } = {
    'missing stripe token': {
        _id: 'my-invalid-ticket-id-4',
        eventId: 'my-event',
        ticketGroupId: 'my-ticket-group',
        attendeeId: 'my-attendee',
        datePurchase: new Date("2019-11-12T21:00:00.000Z"),
        paymentId: 'mock-stripe-charge-2',
        paymentToken: '',
        price: 199.99,
        attendeeName: 'Hiestaa',
        attendeeEmail: 'hello@world.next'
    },
    'missing stripe charges': {
        _id: 'my-invalid-ticket-id-5',
        eventId: 'my-event',
        ticketGroupId: 'my-ticket-group',
        attendeeId: 'my-attendee',
        datePurchase: new Date("2019-11-12T21:00:00.000Z"),
        paymentId: '',
        paymentToken: 'some-token',
        price: 199.99,
        attendeeName: 'Hiestaa',
        attendeeEmail: 'hello@world.next'
    },
    'missing attendee name': {
        _id: 'my-invalid-ticket-id-6',
        eventId: 'my-event',
        ticketGroupId: 'my-ticket-group',
        attendeeId: 'my-attendee',
        datePurchase: new Date("2019-11-12T21:00:00.000Z"),
        paymentId: 'mock-stripe-charge-2',
        paymentToken: 'mock-token',
        price: 199.99,
        attendeeName: '',
        attendeeEmail: 'hello@world.next'
    },
    'missing attendee email': {
        _id: 'my-invalid-ticket-id-6',
        eventId: 'my-event',
        ticketGroupId: 'my-ticket-group',
        attendeeId: 'my-attendee',
        datePurchase: new Date("2019-11-12T21:00:00.000Z"),
        paymentId: 'mock-stripe-charge-2',
        paymentToken: 'mock-token',
        price: 199.99,
        attendeeName: 'Some name',
        attendeeEmail: ''
    }
}
