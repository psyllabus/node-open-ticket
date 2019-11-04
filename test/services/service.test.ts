import chai from 'chai';
const expect = chai.expect;

import fixtures from '../fixtures';
import { EventService } from '../../src/services/events';
import { TicketGroupService } from '../../src/services/ticketGroups';
import { AttendeeService } from '../../src/services/attendees';
import { Service } from '../../src/services/service';
import { TicketService } from '../../src/services/tickets';
import { Db } from 'mongodb';

const services = {
    events: EventService,
    ticketGroups: TicketGroupService,
    attendees: AttendeeService,
    tickets: TicketService
}

require('../test.bootstrap.ts');

const createDependencies = async (db: Db, dependencies: { [key: string]: any[] }) => {
    for (const itemType in dependencies) {
        const col = db.collection(itemType);
        if (dependencies.hasOwnProperty(itemType)) {
            const items = dependencies[itemType];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                await col.insertOne(item);
            }
        }
    }
}

/**
 * Generic services test for CRUD operations.
 */
describe('services', function () {
    for (const itemType in fixtures) {
        const singularItemType = itemType.substring(0, -1);
        if (fixtures.hasOwnProperty(itemType)) {
            const {data, dependencies} = fixtures[itemType];
            describe(itemType, function () {
                const ServiceClass = services[itemType];
                let service: Service<any>;

                before(function () {
                    service = new ServiceClass(this.db);
                    return createDependencies(this.db, dependencies);
                });

                it(`should create an ${singularItemType}`, function () {
                    return service.create(data[0])
                    .then(event => {
                        expect(event).to.deep.equal(data[0]);
                    });
                });

                it(`should retrieve the ${singularItemType}`, function () {
                    return expect(service.get(data[0]._id)).to.eventually.be.deep.equal(data[0]);
                });

                it(`should update the ${singularItemType}`, function () {
                    return service.update(data[0]._id, data[1])
                    .then(event => {
                        expect(event).to.be.deep.equal(data[1]);
                        return expect(service.get(data[0]._id)).to.eventually.be.deep.equal(data[1])
                    });
                });

                it(`should list all ${itemType}`, function () {
                    return service.create(data[2])
                    .then(event => {
                        expect(event).to.be.deep.equal(data[2]);
                        return expect(service.list()).to.eventually.be.deep.equal([data[1], data[2]]);
                    })
                });

                it(`should list first page of ${itemType}`, function () {
                    return expect(service.list(1)).to.eventually.be.deep.equal([data[1]]);
                })

                it(`should list second page of ${itemType}`, function () {
                    return expect(service.list(1, 1)).to.eventually.be.deep.equal([data[2]]);
                });

                it(`should delete existing ${itemType}`, function () {
                    return service.delete(data[0]._id)
                    .then(() => {
                       return Promise.all([
                           expect(service.get(data[0]._id)).to.eventually.be.null,
                           expect(service.list()).to.eventually.be.deep.equal([data[2]])
                       ]);
                    });
                });
            });
        }
    }
});
