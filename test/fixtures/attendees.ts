import { Attendee } from "../../src/services/attendees/types";

export const data: Attendee[] = [
    {
        "_id": "attendee-id-1",
        "name": "Romain G",
        "email": "rom1guyot@gmail.com"
    },
    {
        "_id": "attendee-id-1",
        "name": "Romain Guyot",
        "email": "rom2guyot@gmail.com",
        "password": "some-hashed-password"
    },
    {
        "_id": "attendee-id-2",
        "name": "Hiestaa",
        "email": "hello@world.net",
        "password": "Seriously who stores passwords in clear text?"
    }
];
