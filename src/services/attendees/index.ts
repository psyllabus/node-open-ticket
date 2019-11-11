import { Attendee } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';

export class AttendeeService extends Service<Attendee> {
    constructor(db: Db) {
        super(db, 'attendees');
    }


    validate(item: Attendee) {
        if (!item.name || item.name.length == 0) {
            throw new Error('Missing ticket holder name');
        }

        // TODO: validate email regex? Try send an email with confirmation link?
        // OR: offer a way to update email after the fact, given an attendee id and password
        // might require a shortcode that is human readable instead of ugly mongodb id
        if (!item.email || item.email.length == 0) {
            throw new Error("Missing ticket holder email");
        }
    }


    checkRequiredFor(id: string) {
        return this._col('tickets').find({
            attendeeId: id
        }).count().then(count => {
            if (count > 0) {
                throw new Error(
                    `Unable to delete attendee ${id} as some tickets depend on it.`
                );
            }
        });
    }
}
