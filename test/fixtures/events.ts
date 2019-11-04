import { Event } from "../../src/services/events/types";

export default [
    {
        "_id": "event-id-1",
        "name": "My First Event",
        "start": new Date("2019-11-01T20:00:00.000Z"),
        "end": new Date("2019-11-02T03:00:00.000Z")
    },
    {
        "_id": "event-id-1",
        "name": "My First Event Update",
        "start": new Date("2019-11-10T20:00:00.000Z"),
        "end": new Date("2019-11-11T03:00:00.000Z")
    },
    {
        "_id": "event-id-2",
        "name": "My Second Event",
        "start": new Date("2019-12-01T20:00:00.000Z"),
        "end": new Date("2019-12-02T03:00:00.000Z")
    }
] as Event[];
