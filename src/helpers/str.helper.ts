import * as _ from 'lodash';
import validator from 'validator';

export namespace Str {
    export function isTrue(value: any): boolean {
        value = value + '';
        value = value.toLowerCase();
        return (
            value == 'true' || value == '1' ||
            value == 'y' || value == 'yes' || value == 'ok'
        );
    }

    export function toIntOrNull(value: any): any {
        let result = parseInt(value + '');
        return isNaN(result) ? null : result;
    }

    export function toIntOrZero(value: any): number {
        let result = parseInt(value);
        return isNaN(result) ? 0 : result;
    }

    export function isZero(value?: any): boolean {
        let result = parseInt(value);
        return !isNaN(result) && result == 0;
    }

    export function toSQLInString(items: Array<string | number>) {
        let result = items.map((item) => {
            return _.isNumber(item) ? item : `'${item}'`
        }).join(',');
        return result;
    }

    export function isEmail(value: string): boolean {
        return validator.isEmail(value);
    }

    export function isString(value: any) {
        return _.isString(value);
    }

    export function isURL(value: string) {
        return validator.isURL(value);
    }

    export function isEmpty(value: any) {
        return _.isEmpty(value);
    }

    export function capitalize(value: string) {
        return _.capitalize(value);
    }

    export function padStart(value: string, length: number, chars: string = '0') {
        return _.padStart(value, length, chars);
    }

    export function reverse(value: string): string {
        let result = value.split('').reverse().join('');
        return result;
    }

    export function toErrorCode(message: string) {
        message = message + '';
        let code = message.replace(/[^a-zA-Z0-9\s]/g, '');
        code = code.replace(/\s/g, '_');
        code = code.toUpperCase();
        return code;
    }
}