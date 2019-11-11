import { Ticket } from './types';
import { Service } from '../service';
import { Db } from 'mongodb';
import { AttendeeService } from '../attendees';
import { TicketGroupService } from '../ticketGroups';
import { EventService } from '../events';

export class TicketService extends Service<Ticket> {
    eventService: EventService;
    attendeeService: AttendeeService;
    ticketGroupService: TicketGroupService;

    constructor(db: Db) {
        super(db, 'tickets');
        this.eventService = new EventService(db);
        this.attendeeService = new AttendeeService(db);
        this.ticketGroupService = new TicketGroupService(db);
    }

    validate(item: Ticket) {
        if (!item.attendeeName || item.attendeeName.length == 0) {
            throw new Error('Missing ticket holder name');
        }

        // TODO: validate email regex? Try send an email with confirmation link?
        // OR: offer a way to update email after the fact, given an attendee id and password
        // might require a shortcode that is human readable instead of ugly mongodb id
        if (!item.attendeeEmail || item.attendeeEmail.length == 0) {
            throw new Error("Missing ticket holder email");
        }

        if (!item.paymentToken || item.paymentToken.length == 0) {
            throw new Error('Missing stripe token');
        }

        if (!item.paymentId || item.paymentId.length == 0) {
            throw new Error('Missing stripe charge');
        }
    }

    checkRequirements(item: Ticket): Promise<any> {
        return this.eventService.get(item.eventId)
        .then(event => {
            if (!event) {
                throw new Error(`missing event dependency: '${item.eventId}'`);
            }
        })
        .then(() => this.attendeeService.get(item.attendeeId)).then(attendee => {
            if (!attendee) {
                throw new Error(`missing attendee dependency: '${item.attendeeId}'`)
            }
        }).then(() => this.ticketGroupService.get(item.ticketGroupId)).then(ticketGroup => {
            if (!ticketGroup) {
                throw new Error(`missing ticketGroup dependency: '${item.ticketGroupId}'`);
            }
        });
    }
}
