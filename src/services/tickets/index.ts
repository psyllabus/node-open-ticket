import { Ticket } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';

export class TicketService extends Service<Ticket> {
    constructor(db: Db) {
        super(db, 'tickets');
    }

    // TODO: safeguard and link verifications
}
