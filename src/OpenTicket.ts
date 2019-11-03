import { MongoClient } from 'mongodb';

export interface Config {
    adminPassword: string,
    mongoUri: string,
    stripeKey: string;
}
/**
 * Main interface with the OpenTicket module.
 */
export class OpenTicket {
    config: Config;
    pDB: Promise<MongoClient>;
    /**
     * Initialize the open ticket module
     * @param config module integrations configuration
     */
    constructor(config: Config) {
        this.config = config;

        this.pDB = MongoClient.connect(this.config.mongoUri);
    }

    middleware() {

    }
}
