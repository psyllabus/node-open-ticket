import { Attendee } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';

export class AttendeeService extends Service<Attendee> {
    constructor(db: Db) {
        super(db, 'attendees');
    }

    // TODO: safeguards and link verification on CRUD
}
