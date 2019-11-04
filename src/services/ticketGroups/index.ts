import { TicketGroup } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';

export class TicketGroupService extends Service<TicketGroup> {
    constructor(db: Db) {
        super(db, 'ticketGroups');
    }
}
