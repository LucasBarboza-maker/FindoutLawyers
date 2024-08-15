'use strict';

import { FastifyRequest } from 'fastify';

// ------------------------------------------------------------------
// | [requirement]
// ------------------------------------------------------------------

export async function parseJsonBody(request: FastifyRequest): Promise<void> {
    if (typeof request.body === 'string') {
        request.body = JSON.parse(request.body);
    }
}

/**
 * @example
 * const domain = getDomainUrl(request)
 * const url = `${domain}/error`
 */
export function getDomainUrl(request: FastifyRequest): string {
    const { hostname, protocol } = request;
    return `${protocol}://${hostname}`;
}
