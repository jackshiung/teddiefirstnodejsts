import { BaseResult } from './result.vm';
import { Request, Response } from "express";
import { LicenseTokenPayload, ManagementTokenPayload } from './token.vm';
export interface AppRequest extends Request {
    managementTokenPayload: ManagementTokenPayload,
    licenseTokenPayload: LicenseTokenPayload
}

export interface AppResponse extends Response {
    result: BaseResult
}