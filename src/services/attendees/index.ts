import { Attendee } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';

export class AttendeeService extends Service<Attendee> {
    constructor(db: Db) {
        super(db, 'attendees');
    }

    checkRequiredFor(id: string) {
        return this._col('tickets').find({
            attendee_id: id
        }).count().then(count => {
            if (count > 0) {
                throw new Error(
                    `Unable to delete attendee ${id} as some tickets depend on it.`
                );
            }
        });
    }
}
