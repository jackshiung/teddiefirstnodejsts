import { ResultCode } from './result.vm';
interface APPErrorConstructor {
    message: string
    code: ResultCode
}
export class AppError extends Error {
    code: ResultCode
    constructor(param: APPErrorConstructor) {
        super(param.message);
        this.code = param.code;
    }
}

interface APIErrorResult {
    success: boolean;
    error: {
        code: ResultCode;
        message: string;
    }
}


export function getErrorResult(error: any): APIErrorResult {
    const result: APIErrorResult = {
        success: false,
        error
    }
    return result
}