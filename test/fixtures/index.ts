import * as events from './events';
import * as ticketGroups from './ticketGroups';
import * as attendees from './attendees';
import * as tickets from './tickets';

/**
 * Fixtures organized by type of item
 * Note that all fixtures will have their first three elements used for generic CRUD testing
 */
const fixtures: {[key: string]: {data: any[], dependencies?: {[key: string]: any[]}}} = {
    events: events,
    ticketGroups: ticketGroups,
    attendees: attendees,
    tickets: tickets
};

export default fixtures;
