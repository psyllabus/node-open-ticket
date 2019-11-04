export default [
    {
        "_id": "ticket-group-id-1",
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
        "name": "My Second Ticket Group",
        "description": "Second group of tickets for my event",
        "is_limited": false,
        "limit": 1000,
        "price": 10,
        "currency": "USD",
        "sale_open": new Date("2019-11-15T22:00:00.000Z"),
        "sale_close": new Date("2019-11-16T08:00:00.000Z")
    },
]
