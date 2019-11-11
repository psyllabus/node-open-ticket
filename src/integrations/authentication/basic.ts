import { Authentication } from './interface';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';

const basicAuth = require('express-basic-auth')

interface BasicAuthConfig {
    users: { [key: string]: string };
}

export class BasicAuth implements Authentication {
    config: BasicAuthConfig;

    constructor(config: BasicAuthConfig) {
        this.config = config;
    }

    middleware(): (req: Request, res: Response, next: NextFunction) => void {
        return basicAuth(this.config);
    }
}
