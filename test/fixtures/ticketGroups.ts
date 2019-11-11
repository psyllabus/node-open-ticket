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
        "eventId": "event-dep-id-1",
        "name": "My First Ticket Group",
        "description": "First group of tickets for my event",
        "isLimited": false,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "saleOpen": new Date("2019-11-01T20:00:00.000Z"),
        "saleClose": new Date("2019-11-02T03:00:00.000Z")
    },
    {
        "_id": "ticket-group-id-1",
        "eventId": "event-dep-id-1",
        "name": "My First Ticket Group, updated",
        "description": "First group of tickets for my event, updated",
        "isLimited": true,
        "limit": 10000,
        "price": 150,
        "currency": "USD",
        "saleOpen": new Date("2019-11-11T21:00:00.000Z"),
        "saleClose": new Date("2019-11-12T04:00:00.000Z")
    },
    {
        "_id": "ticket-group-id-2",
        "eventId": "event-dep-id-1",
        "name": "My Second Ticket Group",
        "description": "Second group of tickets for my event",
        "isLimited": false,
        "limit": 1000,
        "price": 10,
        "currency": "USD",
        "saleOpen": new Date("2019-11-15T22:00:00.000Z"),
        "saleClose": new Date("2019-11-16T08:00:00.000Z")
    },
    {
        "_id": "ticket-group-id-3",
        "eventId": "event-id-3",
        "name": "My Third Ticket Group",
        "description": "Third group of tickets for my event",
        "isLimited": false,
        "limit": 1000,
        "price": 10,
        "currency": "USD",
        "saleOpen": new Date(Date.now() - 30 * 24 * 3600),
        "saleClose": new Date(Date.now() + 24 * 3600 - 1)
    },
    {
        "_id": "ticket-group-id-4",
        "eventId": "event-id-3",
        "name": "Closed ticket group",
        "description": "Ticket group that's already closed",
        "isLimited": false,
        "limit": 1000,
        "price": 10,
        "currency": "USD",
        "saleOpen": new Date(Date.now() - 30 * 24 * 3600),
        "saleClose": new Date(Date.now() - 24 * 3600 - 1)
    },
    {
        "_id": "ticket-group-id-5",
        "eventId": "event-id-3",
        "name": "Not Open ticket group",
        "description": "Ticket group that's not open yet",
        "isLimited": false,
        "limit": 1000,
        "price": 10,
        "currency": "USD",
        "saleOpen": new Date(Date.now() + 12 * 3600),
        "saleClose": new Date(Date.now() + 24 * 3600 - 1)
    },
    {
        "_id": "ticket-group-id-6",
        "eventId": "event-id-3",
        "name": "Not Open ticket group",
        "description": "Ticket group that's not open yet",
        "isLimited": true,
        "limit": 1,
        "price": 1000,
        "currency": "USD",
        "saleOpen": new Date(Date.now() - 30 * 24 * 3600),
        "saleClose": new Date(Date.now() + 24 * 3600 - 1)
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
        "start": new Date("2020-11-01T20:00:00.000Z"),
        "end": new Date("2020-11-02T03:00:00.000Z")
    }]
}

/**
 * Items should fail insertion and update due to missing dependency.
 */
export const missingDependencies: {event: TicketGroup} = {
    event: {
        "_id": "ticket-group-id-3",
        "eventId": "event-dep-id-2",
        "name": "My Failed Ticket Group",
        "description": "Failed group of tickets for my event",
        "isLimited": false,
        "limit": 1000,
        "price": 10,
        "currency": "USD",
        "saleOpen": new Date("2019-11-15T22:00:00.000Z"),
        "saleClose": new Date("2019-11-16T08:00:00.000Z")
    }
}

export const invalidItems: { [key: string]: TicketGroup } = {
    'empty name': {
        "_id": "failed-ticket-group-id-1",
        "eventId": "event-dep-id-1",
        "name": "",
        "description": "First group of tickets for my event",
        "isLimited": false,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "saleOpen": new Date("2019-11-01T20:00:00.000Z"),
        "saleClose": new Date("2019-11-02T03:00:00.000Z")
    },
    'limited to 0': {
        "_id": "failed-ticket-group-id-1",
        "eventId": "event-dep-id-1",
        "name": "Some name",
        "description": "Some group of tickets for my event",
        "isLimited": true,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "saleOpen": new Date("2019-11-01T20:00:00.000Z"),
        "saleClose": new Date("2019-11-02T03:00:00.000Z")
    },
    'negative price': {
        "_id": "failed-ticket-group-id-1",
        "eventId": "event-dep-id-1",
        "name": "some name",
        "description": "First group of tickets for my event",
        "isLimited": false,
        "limit": 0,
        "price": -42,
        "currency": "CAD",
        "saleOpen": new Date("2019-11-01T20:00:00.000Z"),
        "saleClose": new Date("2019-11-02T03:00:00.000Z")
    },
    'sale opens after it closes': {
        "_id": "failed-ticket-group-id-1",
        "eventId": "event-dep-id-1",
        "name": "",
        "description": "First group of tickets for my event",
        "isLimited": false,
        "limit": 0,
        "price": 100,
        "currency": "CAD",
        "saleOpen": new Date("2019-11-02T20:00:00.000Z"),
        "saleClose": new Date("2019-11-01T03:00:00.000Z")
    },
    'sale closes after the end of the event': {
        "_id": "failed-ticket-group-id-1",
        "eventId": "event-dep-id-1",
        "name": "some name",
        "description": "failed group of tickets",
        "isLimited": false,
        "limit": 0,
        "price": 1000,
        "currency": "CAD",
        "saleOpen": new Date("2020-11-01T20:00:00.000Z"),
        "saleClose": new Date("2020-12-01T20:00:00.000Z")
    },
    'sale opens after the end of the event': {
        "_id": "failed-ticket-group-id-1",
        "eventId": "event-dep-id-1",
        "name": "some name",
        "description": "failed group of tickets",
        "isLimited": false,
        "limit": 0,
        "price": 1000,
        "currency": "CAD",
        "saleOpen": new Date("2020-12-01T20:00:00.000Z")
    }
}
