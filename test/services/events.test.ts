import chai from 'chai';

require('../test.bootstrap.ts');

import { EventService } from '../../src/services/events';

import events from '../fixtures/events';

const expect = chai.expect;


describe('services', function () {
    describe('events', function () {
        let eventService: EventService;

        before(function () {
            eventService = new EventService(this.db);
        });

        it('should create an event', function () {
            return eventService.create(events[0])
            .then(event => {
                expect(event).not.to.be.undefined;
                expect(event._id).to.equal(events[0]._id);
                expect(event.name).to.equal(events[0].name);
                expect(event.start.toISOString()).to.equal(events[0].start.toISOString());
                expect(event.end.toISOString()).to.equal(events[0].end.toISOString());
            });
        });

        it('should retrieve the event', function () {
            return expect(eventService.get(events[0]._id)).to.eventually.be.deep.equal(events[0]);
        });

        it('should update the event', function () {
            return eventService.update(events[0]._id, events[1])
            .then(event => {
                expect(event).to.be.deep.equal(events[1]);
                return expect(eventService.get(events[0]._id)).to.eventually.be.deep.equal(events[1])
            });
        });

        it('should list all events', function () {
            return eventService.create(events[2])
            .then(event => {
                expect(event).to.be.deep.equal(events[2]);
                return expect(eventService.list()).to.eventually.be.deep.equal([events[1], events[2]]);
            })
        });

        it('should list first page of events', function () {
            return expect(eventService.list(1)).to.eventually.be.deep.equal([events[1]]);
        })

        it('should list second page of event', function () {
            return expect(eventService.list(1, 1)).to.eventually.be.deep.equal([events[2]]);
        });

        it('should delete existing event', function () {
            return eventService.delete(events[0]._id)
            .then(() => {
               return Promise.all([
                   expect(eventService.get(events[0]._id)).to.eventually.be.null,
                   expect(eventService.list()).to.eventually.be.deep.equal([events[2]])
               ]);
            });
        });
    });
});
