import { Db } from "mongodb";

import { PaymentIntegration } from "./integrations/payment/interface";
import { EventService } from "./services/events";
import { TicketGroupService } from "./services/ticketGroups";
import { AttendeeService } from "./services/attendees";
import { TicketService } from "./services/tickets";
import { StripePayment } from "./integrations/payment/stripe";

export class Api {
    eventService: EventService;
    ticketGroupService: TicketGroupService;
    attendeeService: AttendeeService;
    ticketService: TicketService;

    paymentIntegration: PaymentIntegration

    constructor(paymentIntegration: PaymentIntegration, db: Db) {
        this.eventService = new EventService(db);
        this.ticketGroupService = new TicketGroupService(db);
        this.attendeeService = new AttendeeService(db);
        this.ticketService = new TicketService(db);

        this.paymentIntegration = paymentIntegration;
    }

    // TODO: test this with a mock payment integration
    async buyTicket(eventId: string, ticketGroupId: string, paymentToken: string, name: string, email: string) {
        const ticketGroup = await this.ticketGroupService.get(ticketGroupId);
        if (!ticketGroup) {
            throw new Error(`The ticket group ${ticketGroupId} does not exist`);
        }

        const price = ticketGroup.price;
        const currency = ticketGroup.currency;

        if (ticketGroup.saleOpen.getTime() > Date.now()) {
            throw new Error(`Ticket sale is not open yet. Please try again after date: ${ticketGroup.saleOpen}`);
        }
        if (ticketGroup.saleClose && ticketGroup.saleClose.getTime() < Date.now()) {
            throw new Error(`Unfortunately, the ticket sale for group ${ticketGroup.name} has closed since ${ticketGroup.saleClose}`);
        }
        if (ticketGroup.isLimited) {
            const tickets = await this.ticketService.col.find({ticketGroupId: ticketGroup._id}).toArray();
            if (tickets.length >= ticketGroup.limit) {
                throw new Error(`No remaining ticket available in group: {ticketGroup.name}`);
            }
        }

        const paymentId = await this.paymentIntegration.pay(
            price, currency,
            `Charge for ticket ${ticketGroup.name} bought on ${new Date()} by ${name} / ${email} @ ${price} ${currency}`,
            paymentToken);

        let attendee = await this.attendeeService.col.findOne({email})
        if (!attendee) {
            attendee = await this.attendeeService.create({
                name, email, password: ''
            });
        }

        return await this.ticketService.create({
            eventId,
            ticketGroupId: ticketGroup._id,
            attendeeId: attendee._id,
            datePurchase: new Date(),
            paymentId,
            paymentToken,
            price,
            attendeeName: name,
            attendeeEmail: email
        });
    }
}
