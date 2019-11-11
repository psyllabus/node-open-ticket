import { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Api } from './api';
import { Authentication } from './integrations/authentication/interface';

export interface OTRoutesConfig {
    createEvent?: string;
    listEvents?: string;

    createTicketGroup?: string;
    listTicketGroups?: string;

    buyTicket?: string;
}

export class OTRouter {
    router: Router;
    pApi: Promise<Api>;

    constructor(routes: OTRoutesConfig, auth: Authentication, pApi: Promise<Api>) {
        this.router = Router();
        this.router.use(bodyParser.json())

        const publicRouter = Router();
        publicRouter.post(routes.buyTicket || '/tickets/buy', this._makeRoute(this.buyTicket));
        this.router.use(publicRouter);

        this.router.use(auth.middleware());

        this.router.post(routes.createEvent || '/events/create/', this._makeRoute(this.createEvent));
        this.router.get(routes.listEvents || '/events/list', this._makeRoute(this.listEvents));
        this.router.post(routes.createTicketGroup || '/ticketGroups/create', this._makeRoute(this.createTicketGroup));
        this.router.get(routes.listTicketGroups || '/ticketGroups/list', this._makeRoute(this.listTicketGroups));

        this.pApi = pApi;
    }

    _makeRoute(fn) {
        return (req: Request, res: Response, next: NextFunction) => {
            return Promise.resolve().then(() => {
                return fn(req.query, req.body)
            })
            .then(data => {
                res.json(data);
                res.end();
            })
            .catch(err => {
                res.status(500).end(err.message);
            })
        };
    }

    buyTicket(query, body) {
        const {
            eventId, ticketGroupId, paymentToken, name, email
        } = body;

        return this.pApi.then(api => {
            return api.buyTicket(eventId, ticketGroupId, paymentToken, name, email);
        });
    }

    createEvent(query, body) {
        const { name, start, end } = body;

        return this.pApi.then(api => {
            return api.eventService.create({name, start: new Date(start), end: new Date(end)});
        });
    }

    listEvents(query) {
        return this.pApi.then(api => {
            return api.eventService.list(query.perPage, query.page);
        });
    }

    createTicketGroup(query, body) {
        const {
            eventId, name, description, isLimited, limit, price, currency, saleOpen, saleClose
        } = body;

        return this.pApi.then(api => {
            return api.ticketGroupService.create({
                eventId, name, description, isLimited, limit, price, currency,
                saleOpen: new Date(saleOpen),
                saleClose: saleClose ? new Date(saleClose) : undefined
            });
        })
    }

    listTicketGroups(query) {
        return this.pApi.then(api => {
            return api.ticketGroupService.list(query.perPage, query.page);
        });
    }
}
