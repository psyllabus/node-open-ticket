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
        if (item.saleClose && item.saleClose.getTime() < item.saleOpen.getTime()) {
            throw new Error(`Sale closes before it opens`);
        }
        if (!item.name || item.name.length == 0) {
            throw new Error(`Ticket Group has no name`);
        }
        if (item.isLimited && item.limit <= 0) {
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
        return this.eventService.get(item.eventId)
        .then(event => {
            if (!event) {
                throw new Error(
                    `missing event dependency: '${item.eventId}' referenced by ticket ` +
                    `group '${item.name}' does not exist.`);
            }
            if (item.saleClose && item.saleClose.getTime() > event.end.getTime()) {
                throw new Error(
                    `cannot define a ticket group closing sale on ${item.saleClose} which ` +
                    `is after the end of the event ${event.end}`);
            }
            if (item.saleOpen && item.saleOpen.getTime() > event.end.getTime()) {
                throw new Error(
                    `cannot define a ticket group opening sale on ${item.saleOpen} which ` +
                    `is after the end of the event ${event.end}`);
            }
        });
    }

    checkRequiredFor(id: string) {
        return this._col('tickets').find({
            ticketGroupId: id
        }).count().then(count => {
            if (count > 0) {
                throw new Error(
                    `Unable to delete ticketGroup ${id} as some tickets depend on it.`
                );
            }
        })

    }
}
