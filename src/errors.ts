class BaseError extends Error {
    public status: number;
    public type: string;

    constructor(message?: string | undefined) {
        super(message)
        message = message || '';

        this.type = this.constructor.name;
        this.message = message;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

class BadRequestError extends BaseError {
    constructor(message: string | undefined) {
        super(message);
        this.status = 400;
    }
}

class UnauthorizedError extends BaseError {
    constructor(message: string | undefined) {
        super(message);
        this.status = 401;
    }
}

class ForbadeError extends BaseError {
    constructor(message: string | undefined) {
        super(message);
        this.status = 403;
    }
}

class NotFoundError extends BaseError {
    constructor(message: string | undefined) {
        super(message);
        this.status = 404;
    }
}

class ServerInternalError extends BaseError {
    constructor(message: string | undefined) {
        super(message);
        this.status = 500;
    }
}

/* status: 400 */
export class TokenExpiredError extends BadRequestError {
    constructor(message: string | undefined) {
        super(message);
    }
}

export class InvalidValueError extends BadRequestError {
    constructor(message: string | undefined) {
        super(message);
    }
}

export class DataHasExistedError extends BadRequestError {
    constructor(message: string | undefined) {
        super(message);
    }
}

export class ExecuteError extends BadRequestError {
    constructor(message: string | undefined) {
        super(message);
    }
}

/* status: 401 */
export class AuthenticationFailedError extends UnauthorizedError {
    constructor(message: string | undefined) {
        super(message);
    }
}

/* status: 403 */
export class NoAccessPermissionError extends ForbadeError {
    constructor(message: string | undefined) {
        super(message);
    }
}

/* status: 404 */
export class ResourceNotFoundError extends NotFoundError {
    constructor(message: string | undefined) {
        super(message);
    }
}

export class DataNotFoundError extends NotFoundError {
    constructor(message: string | undefined) {
        super(message);
    }
}

export class DataNotExistError extends NotFoundError {
    constructor(message: string | undefined) {
        super(message);
    }
}