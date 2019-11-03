import { Event } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';

export class EventService extends Service<Event> {
    constructor(db: Db) {
        super(db, 'events');
    }
}
