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
    },
    {
        "_id": "attendee-id-3",
        "name": "Prof X",
        "email": "prof@x.com"
    }
];

export const invalidItems: { [key: string]: Attendee} = {
    'missing name': {
        "_id": "invalid-attendee-id-1",
        "name": "",
        "email": "some@email.com"
    },
    'missing email': {
        "_id": "invalid-attendee-id-2",
        "name": "some name",
        "email": ""
    }
};
