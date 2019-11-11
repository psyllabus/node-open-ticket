import { MongoClient, Db } from 'mongodb';
import { Api } from './api';
import { StripePayment } from './integrations/payment/stripe';
import { OTRoutesConfig, OTRouter } from './otRouter';
import { BasicAuth } from './integrations/authentication/basic';
import { Authentication } from './integrations/authentication/interface';

export interface Config {
    adminPassword: string;
    mongoUri: string;
    stripeKey: string;

    routes: OTRoutesConfig;
}
/**
 * Main interface with the OpenTicket module.
 */
export class OpenTicket {
    config: Config;
    pDB: Promise<Db>;
    pApi: Promise<Api>;
    paymentIntegration: StripePayment;
    authIntegration: Authentication
    router: OTRouter
    /**
     * Initialize the open ticket module
     * @param config module integrations configuration
     */
    constructor(config: Config) {
        this.config = config;

        this.pDB = MongoClient.connect(this.config.mongoUri).then(mongo => mongo.db());
        this.paymentIntegration = new StripePayment(this.config.stripeKey);
        this.authIntegration = new BasicAuth({users: {'admin': this.config.adminPassword}});

        this.pApi = this.pDB.then(db => new Api(this.paymentIntegration, db));
        this.router = new OTRouter(this.config.routes, this.authIntegration, this.pApi);
    }

    /**
     * Return the middleware providing http api, to be plugged into an express app.
     */
    middleware() {
        return this.router.router;
    }

    /**
     * Return a Promise resolving to the API object.
     * The API is intended for use by administrators only. It gives full power over the
     * data, and can be used to create tickets without payment.
     * Beware not to expose these functions to the client. Use the `middleware` for that instead.
     */
    api() {
        return this.pApi;
    }
}
