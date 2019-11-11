import chai from 'chai';
const expect = chai.expect;

require('../test.bootstrap.ts');

import { MockPayment } from '../mocks/mockPayment';
import { Api } from '../../src/api';

import fixtures from '../fixtures';
import { TicketGroup } from '../../src/services/ticketGroups/types';


describe('api', function () {
    before(async function () {
        this.mockPayment = new MockPayment()
        this.api = new Api(this.mockPayment, this.db);
        await this.api.eventService.create(fixtures.events.data[3]);
        await this.api.ticketGroupService.create(fixtures.ticketGroups.data[3]);
        await this.api.ticketGroupService.create(fixtures.ticketGroups.data[4]);
        await this.api.ticketGroupService.create(fixtures.ticketGroups.data[5]);
    });

    after(async function () {
        await this.db.collection('tickets').deleteMany({});
        await this.db.collection('attendees').deleteMany({});
        await this.db.collection('ticketGroups').deleteMany({});
        await this.db.collection('events').deleteMany({});
    });
    describe('buyTiket', function () {
        it('should allow buying a ticket', async function () {
            const now = Date.now();
            const { _id } = await this.api.buyTicket(
                fixtures.events.data[3]._id,
                fixtures.ticketGroups.data[3]._id,
                'some-payment-token',
                'Megsie', 'meg@sie.com')

            const ticket = await this.api.ticketService.get(_id);
            expect(ticket).to.deep.equal({
                _id,
                eventId: fixtures.events.data[3]._id,
                ticketGroupId: fixtures.ticketGroups.data[3]._id,
                attendeeId: ticket.attendeeId,
                datePurchase: ticket.datePurchase,
                paymentId: this.mockPayment.paymentId,
                paymentToken: 'some-payment-token',
                price: (fixtures.ticketGroups.data[3] as TicketGroup).price,
                attendeeName: 'Megsie',
                attendeeEmail: 'meg@sie.com'
            });
            expect(ticket.datePurchase.getTime()).to.be.above(now);

            const attendee = await this.api.attendeeService.get(ticket.attendeeId);
            expect(attendee).to.deep.equal({
                _id: attendee._id,
                name: 'Megsie',
                email: 'meg@sie.com',
                password: ''
            });
        });

        it('should prevent from buying a ticket if the payment processing doesn\'t succeed', async function () {
            this.mockPayment.fail = true;
            try {
                await expect(this.api.buyTicket(
                    fixtures.events.data[3]._id,
                    fixtures.ticketGroups.data[3]._id,
                    'some-payment-token',
                    'Megsie', 'meg@sie.com')
                ).to.be.eventually.rejected;
            }
            finally {
                this.mockPayment.fail = false;
            }
        });

        it('should prevent from buying a ticket if limit is reached', function () {
            return expect(this.api.buyTicket(
                fixtures.events.data[3]._id,
                fixtures.ticketGroups.data[6]._id,
                'some-payment-token',
                'Megsie', 'meg@sie.com')
            ).to.be.eventually.rejected;
        });

        it('should prevent from buying a ticket if sale isn\'t open yet', function () {
            return expect(this.api.buyTicket(
                fixtures.events.data[3]._id,
                fixtures.ticketGroups.data[6]._id,
                'some-payment-token',
                'Megsie', 'meg@sie.com')
            ).to.be.eventually.rejected;
        });

        it('should prevent from buying a ticket if sale is closed', function () {
            return expect(this.api.buyTicket(
                fixtures.events.data[3]._id,
                fixtures.ticketGroups.data[4]._id,
                'some-payment-token',
                'Megsie', 'meg@sie.com')
            ).to.be.eventually.rejected;
        });

        it('should prevent from buying a ticket if ticket group does not exist', function () {
            return expect(this.api.buyTicket(
                fixtures.events.data[3]._id,
                fixtures.ticketGroups.data[5]._id,
                'some-payment-token',
                'Megsie', 'meg@sie.com')
            ).to.be.eventually.rejected;
        });

        it('should not create an attendee if it email exist already', async function () {
            const now = Date.now();
            const { _id } = await this.api.buyTicket(
                fixtures.events.data[3]._id,
                fixtures.ticketGroups.data[3]._id,
                'some-payment-token',
                'Megsie', 'meg@sie.com')

            const ticket = await this.api.ticketService.get(_id);
            expect(ticket).to.deep.equal({
                _id,
                eventId: fixtures.events.data[3]._id,
                ticketGroupId: fixtures.ticketGroups.data[3]._id,
                attendeeId: ticket.attendeeId,
                datePurchase: ticket.datePurchase,
                paymentId: this.mockPayment.paymentId,
                paymentToken: 'some-payment-token',
                price: (fixtures.ticketGroups.data[3] as TicketGroup).price,
                attendeeName: 'Megsie',
                attendeeEmail: 'meg@sie.com'
            });
            expect(ticket.datePurchase.getTime()).to.be.above(now);

            const attendee = await this.api.attendeeService.get(ticket.attendeeId);
            expect(attendee).to.deep.equal({
                _id: attendee._id,
                name: 'Megsie',
                email: 'meg@sie.com',
                password: ''
            });

            expect((await this.api.attendeeService.list()).length).to.equal(1);
        });
    });
});
