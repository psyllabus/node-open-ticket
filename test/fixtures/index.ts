import * as events from './events';
import * as ticketGroups from './ticketGroups';
import * as attendees from './attendees';
import * as tickets from './tickets';

interface With_Id {
    _id?: string;
}

/**
 * Fixtures organized by type of item
 * Note that all fixture data will have their first three elements used for generic CRUD testing
 */
const fixtures: { [key: string]: {
    data: With_Id[],
    dependencies?: { [key: string]: With_Id[] },
    missingDependencies?: { [key: string]: With_Id },
    invalidItems?: {[key: string]: With_Id}
}} = {
    events: events,
    ticketGroups: ticketGroups,
    attendees: attendees,
    tickets: tickets
};

export default fixtures;
