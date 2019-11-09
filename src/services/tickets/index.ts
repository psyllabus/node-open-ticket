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
        if (!item.attendee_name || item.attendee_name.length == 0) {
            throw new Error('Missing ticket holder name');
        }

        // TODO: validate email regex? Try send an email with confirmation link?
        // OR: offer a way to update email after the fact, given an attendee id and password
        // might require a shortcode that is human readable instead of ugly mongodb id
        if (!item.attendee_email || item.attendee_email.length == 0) {
            throw new Error("Missing ticket holder email");
        }

        if (!item.stripe_token || item.stripe_token.length == 0) {
            throw new Error('Missing stripe token');
        }

        if (!item.stripe_charge_id || item.stripe_charge_id.length == 0) {
            throw new Error('Missing stripe charge');
        }
    }

    checkRequirements(item: Ticket): Promise<any> {
        return this.eventService.get(item.event_id)
        .then(event => {
            if (!event) {
                throw new Error(`missing event dependency: '${item.event_id}'`);
            }
        })
        .then(() => this.attendeeService.get(item.attendee_id)).then(attendee => {
            if (!attendee) {
                throw new Error(`missing attendee dependency: '${item.attendee_id}'`)
            }
        }).then(() => this.ticketGroupService.get(item.ticket_group_id)).then(ticketGroup => {
            if (!ticketGroup) {
                throw new Error(`missing ticketGroup dependency: '${item.ticket_group_id}'`);
            }
        });
    }
}
