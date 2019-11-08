import { Event } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';

export class EventService extends Service<Event> {
    constructor(db: Db) {
        super(db, 'events');
    }

    validate(event: Event) {
        if (!event.name || event.name.length == 0) {
            throw new Error('Missing event name');
        }
        if (event.end.getTime() <= event.start.getTime()) {
            throw new Error('Invalid event dates: event should start before it ends');
        }
    }

    checkRequiredFor(id: string) {
        return this._col('ticketGroups').count({
            event_id: id
        }).then(count => {
            if (count > 0) {
                throw new Error(
                    `Unable to delete event ${id} as some ticketGroups depend on it.`
                );
            }
        }).then(() => this._col('tickets').count({
            event_id: id
        }).then(count => {
            if (count > 0) {
                throw new Error(
                    `Unable to delete event ${id} as some tickets depend on it.`
                );
            }
        }));
    }
}
