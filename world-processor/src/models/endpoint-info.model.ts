import {Request, Response} from 'express-serve-static-core';

/**
 * Endpoint info tuple used for express.js server.
 */
export type EndpointInfo = [
    /**
     * Endpoint path; e.g. "/generate-world".
     */
    string,
    /**
     * Endpoint callback.
     */
    (request: Request, response: Response) => void,
]