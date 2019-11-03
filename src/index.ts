import { Config } from './OpenTicket';
// JS Module API
export { OpenTicket } from './OpenTicket';

// Middleware API (also sets up HTML UI if installed)
export function init(config: Config) {
    // TODO: everything
    return (err: Error, data: any, next: () => void) => {
        next();
    }
}
