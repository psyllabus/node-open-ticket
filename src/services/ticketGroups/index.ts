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

    validate(item: TicketGroup) {
        if (item.sale_close && item.sale_close.getTime() < item.sale_open.getTime()) {
            throw new Error(`Sale closes before it opens`);
        }
        if (!item.name || item.name.length == 0) {
            throw new Error(`Ticket Group has no name`);
        }
        if (item.is_limited && item.limit <= 0) {
            throw new Error(`Limited ticket groups need to have a limit!`);
        }
        if (!item.currency || item.currency.length == 0) {
            throw new Error(`Unspecified currency`);
        }
        if (item.price < 0) {
            throw new Error('Price cannot be negative');
        }
    }

    checkRequirements(item: TicketGroup) {
        return this.eventService.get(item.event_id)
        .then(event => {
            if (!event) {
                throw new Error(`missing event dependency: '${item.event_id}' referenced by ticket group '${item.name}' does not exist.`);
            }
        });
    }

    checkRequiredFor(id: string) {
        return this._col('tickets').find({
            ticket_group_id: id
        }).count().then(count => {
            if (count > 0) {
                throw new Error(`Unable to delete ticket group ${id}: ${count} tickets already sold.`);
            }
        })

    }
}
