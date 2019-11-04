import { TicketGroup } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';
import { EventService } from '../events';
import { Event } from '../events/types';

export class TicketGroupService extends Service<TicketGroup> {
    eventService: EventService;

    constructor(db: Db) {
        super(db, 'ticketGroups');
        this.eventService = new EventService(db);
    }

    _verifyEventExist(item: TicketGroup): Promise<Event> {
        return this.eventService.get(item.event_id)
        .then(event => {
            if (!event) {
                throw new Error(`The event '${item.event_id}' for the ticket group '${item.name}' does not exist.`);
            }
            return event;
        });
    }

    create(item: TicketGroup): Promise<TicketGroup> {
        return this._verifyEventExist(item)
        .then(() => {
            return super.create(item);
        });
    }

    update(id: string, item: TicketGroup): Promise<TicketGroup> {
        return this._verifyEventExist(item)
        .then(() => {
            return super.update(id, item);
        });
    }

    delete(id: string) {
        // Not using the ticket service to avoid circular dependency.
        // The ticket service will tap in the TicketGroup service for info.
        return this.db.collection('ticket').find({
            ticket_group_id: id
        }).count().then(count => {
            if (count > 0) {
                throw new Error(`Unable to delete ticket group ${id}: ${count} tickets already sold.`);
            }
            return super.delete(id);
        })
    }
}
