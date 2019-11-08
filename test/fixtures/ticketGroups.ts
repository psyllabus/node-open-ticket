import { TicketGroup } from "../../src/services/ticketGroups/types";
import { Event } from "../../src/services/events/types";

/**
 * Dataset used by CRUD operations (and other tests)
 * First item is used for create and read test
 * second item is used for update test
 * third item is used for delete test
 * third item is used along with the other one for list test
 */
export const data: TicketGroup[] = [
    {
        "_id": "ticket-group-id-1",
        "event_id": "event-dep-id-1",
        "name": "My First Ticket Group",
        "description": "First group of tickets for my event",
        "is_limited": false,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "sale_open": new Date("2019-11-01T20:00:00.000Z"),
        "sale_close": new Date("2019-11-02T03:00:00.000Z")
    },
    {
        "_id": "ticket-group-id-1",
        "event_id": "event-dep-id-1",
        "name": "My First Ticket Group, updated",
        "description": "First group of tickets for my event, updated",
        "is_limited": true,
        "limit": 10000,
        "price": 150,
        "currency": "USD",
        "sale_open": new Date("2019-11-11T21:00:00.000Z"),
        "sale_close": new Date("2019-11-12T04:00:00.000Z")
    },
    {
        "_id": "ticket-group-id-2",
        "event_id": "event-dep-id-1",
        "name": "My Second Ticket Group",
        "description": "Second group of tickets for my event",
        "is_limited": false,
        "limit": 1000,
        "price": 10,
        "currency": "USD",
        "sale_open": new Date("2019-11-15T22:00:00.000Z"),
        "sale_close": new Date("2019-11-16T08:00:00.000Z")
    },
];

/**
 * Dependencies required for inserting the data
 * Each item will be tested to be not delete-able in presence of items depending on it
 */
export const dependencies: {events: Event[]} = {
    events: [{
        "_id": "event-dep-id-1",
        "name": "Some Dependent Event",
        "start": new Date("2019-11-01T20:00:00.000Z"),
        "end": new Date("2019-11-02T03:00:00.000Z")
    }]
}

/**
 * Items should fail insertion and update due to missing dependency.
 */
export const missingDependencies: {event: TicketGroup} = {
    event: {
        "_id": "ticket-group-id-3",
        "event_id": "event-dep-id-2",
        "name": "My Failed Ticket Group",
        "description": "Failed group of tickets for my event",
        "is_limited": false,
        "limit": 1000,
        "price": 10,
        "currency": "USD",
        "sale_open": new Date("2019-11-15T22:00:00.000Z"),
        "sale_close": new Date("2019-11-16T08:00:00.000Z")
    }
}

export const invalidItems: { [key: string]: TicketGroup } = {
    'empty name': {
        "_id": "failed-ticket-group-id-1",
        "event_id": "event-dep-id-1",
        "name": "",
        "description": "First group of tickets for my event",
        "is_limited": false,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "sale_open": new Date("2019-11-01T20:00:00.000Z"),
        "sale_close": new Date("2019-11-02T03:00:00.000Z")
    },
    'limited to 0': {
        "_id": "failed-ticket-group-id-1",
        "event_id": "event-dep-id-1",
        "name": "Some name",
        "description": "Some group of tickets for my event",
        "is_limited": true,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "sale_open": new Date("2019-11-01T20:00:00.000Z"),
        "sale_close": new Date("2019-11-02T03:00:00.000Z")
    },
    'negative price': {
        "_id": "failed-ticket-group-id-1",
        "event_id": "event-dep-id-1",
        "name": "some name",
        "description": "First group of tickets for my event",
        "is_limited": false,
        "limit": 0,
        "price": -42,
        "currency": "CAD",
        "sale_open": new Date("2019-11-01T20:00:00.000Z"),
        "sale_close": new Date("2019-11-02T03:00:00.000Z")
    },
    'sale opens after it closes': {
        "_id": "failed-ticket-group-id-1",
        "event_id": "event-dep-id-1",
        "name": "",
        "description": "First group of tickets for my event",
        "is_limited": false,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "sale_open": new Date("2019-11-02T20:00:00.000Z"),
        "sale_close": new Date("2019-11-01T03:00:00.000Z")
    },
}
