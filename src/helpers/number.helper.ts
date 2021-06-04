import * as _ from 'lodash';
import * as numeral from 'numeral';

export namespace Number {
    export function isNaN(value: number): boolean {
        return _.isNaN(value);
    }

    export function isInfinity(value: number): boolean {
        return (value == Infinity);
    }

    export function isNaNOrInfinity(value: number) {
        return isNaN(value) || isInfinity(value);
    }

    export function format(value: number, input: string): string {
        return numeral(value).format(input);
    }

    export function formatNumeral(value: number): string {
        return numeral(value).format('0,0');
    }
}