import { Event } from "../../src/services/events/types";

export const data: Event[] = [
    {
        "_id": "event-id-1",
        "name": "My First Event",
        "start": new Date("2020-11-01T20:00:00.000Z"),
        "end": new Date("2020-11-02T03:00:00.000Z")
    },
    {
        "_id": "event-id-1",
        "name": "My First Event Update",
        "start": new Date("2020-11-10T20:00:00.000Z"),
        "end": new Date("2020-11-11T03:00:00.000Z")
    },
    {
        "_id": "event-id-2",
        "name": "My Second Event",
        "start": new Date("2020-12-01T20:00:00.000Z"),
        "end": new Date("2020-12-02T03:00:00.000Z")
    }, {
        "_id": "event-id-3",
        "name": "My Third Event",
        "start": new Date(),
        "end": new Date(Date.now() + 48 * 3600),
    }
];

export const invalidItems: {[key: string]: Event} = {
    'starts after it ends': {
        "_id": "failed-event-id-1",
        "name": "failure",
        "start": new Date(),
        "end": new Date(new Date().getTime() - 100000)
    },
    'empty name': {
        "_id": "failed-event-id-1",
        "name": "",
        "start": new Date(),
        "end": new Date(new Date().getTime() - 100000)
    }
};
