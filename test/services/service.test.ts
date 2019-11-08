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
    for (const itemType in (dependencies || {})) {
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
 * The test is statefull to speed-up the process and keep tests separate:
 * 1. Create DATA[0]
 * 2. Read DATA[0] - also test item was properly inserted
 * 3. Update DATA[0] <- DATA[1]
 * 4. Create DATA[2], List all, list per page
 * 5. Delete DATA[2]
 * 6. Try delete dependencies[depType].map(({_id}) => service.delete(_id), ;should fail
 * 7. Try insert missing dependencies, should fail
 */
describe('services', function () {
    for (const itemType in fixtures) {
        const singularItemType = itemType.substring(0, itemType.length - 1);
        if (fixtures.hasOwnProperty(itemType)) {

            describe(itemType, function () {
                const { data, dependencies, missingDependencies, invalidItems } = fixtures[itemType];
                const ItemServiceClass = services[itemType];
                let itemService: Service<any>;

                before(function () {
                    itemService = new ItemServiceClass(this.db);
                    return createDependencies(this.db, dependencies);
                })

                // afterEach(function () {
                //     return itemService.list().then(items => {
                //         console.log(items);
                //     })
                // })

                it(`should create an ${singularItemType}`, function () {
                    return itemService.create(data[0])
                    .then(event => {
                        expect(event).to.deep.equal(data[0]);
                    });
                });

                it(`should retrieve the ${singularItemType}`, function () {
                    return expect(itemService.get(data[0]._id)).to.eventually.be.deep.equal(data[0]);
                });

                it(`should update the ${singularItemType}`, function () {
                    return itemService.update(data[0]._id, data[1])
                    .then(event => {
                        expect(event).to.be.deep.equal(data[1]);
                        return expect(itemService.get(data[0]._id)).to.eventually.be.deep.equal(data[1])
                    });
                });

                it(`should list all ${itemType}`, function () {
                    return itemService.create(data[2])
                    .then(event => {
                        expect(event).to.be.deep.equal(data[2]);
                        return expect(itemService.list()).to.eventually.be.deep.equal([data[1], data[2]]);
                    })
                });

                it(`should list first page of ${itemType}`, function () {
                    return expect(itemService.list(1)).to.eventually.be.deep.equal([data[1]]);
                })

                it(`should list second page of ${itemType}`, function () {
                    return expect(itemService.list(1, 1)).to.eventually.be.deep.equal([data[2]]);
                });

                it(`should delete existing ${itemType}`, function () {
                    return itemService.delete(data[0]._id)
                    .then(() => {
                       return Promise.all([
                           expect(itemService.get(data[0]._id)).to.eventually.be.null,
                           expect(itemService.list()).to.eventually.be.deep.equal([data[2]])
                       ]);
                    });
                });


                describe(`${itemType} dependencies`, function () {
                    for (const depType in (dependencies || {})) {
                        if (dependencies.hasOwnProperty(depType)) {
                            const singularDepType = depType.substring(0, depType.length - 1);

                            it(`should not be able to delete any dependent ${singularDepType}`, function () {
                                const DepServiceClass = services[depType];
                                const depService = new DepServiceClass(this.db);
                                return Promise.all(dependencies[depType].map(({ _id }) =>
                                    expect(depService.delete(_id)).to.eventually.be.rejectedWith(
                                        `Unable to delete ${singularDepType} ${_id} as some ${itemType} depend on it.`
                                    )
                                ));
                            });
                        }
                    }

                    for (const depType in (missingDependencies || {})) {
                        if (missingDependencies.hasOwnProperty(depType)) {
                            const element = missingDependencies[depType];
                            it(`Should not be able to insert a ${itemType} with missing ${depType} dependency.`, function () {
                                return expect(itemService.create(element)).to.eventually.be.rejectedWith(
                                    `Unable to create ${singularItemType}: missing ${depType} dependency: `
                                );
                            });
                            it(`Should not be able to update a ${itemType} with missing ${depType} dependency.`, function () {
                                return expect(itemService.update(data[0]._id, element)).to.eventually.be.rejectedWith(
                                    `Unable to update ${singularItemType}: missing ${depType} dependency: `
                                );
                            });
                        }
                    }

                });

                describe(`invalid ${itemType}`, function () {
                    for (const reason in invalidItems) {
                        if (invalidItems.hasOwnProperty(reason)) {
                            const item = invalidItems[reason];
                            it(`It should fail inserting a ${singularItemType} with ${reason}`, function () {
                                return expect(itemService.create(item)).to.eventually.be.rejected;
                            });
                        }
                    }
                });
            });
        }
    }
});
