import * as luxon from "luxon";

export namespace Format {
    export function tryGetInteger(num: unknown, defaultValue: number): number {

        if (typeof num === "string") {
            const parsedNumber = parseInt(num);

            if (isNaN(parsedNumber)) {
                return defaultValue
            } else {
                return parsedNumber;
            }
        }

        if (typeof num === "number") {
            return Math.floor(num)
        }


        return defaultValue
    }

    export function tryGetNumber(num: unknown, defaultValue: number | null = null): number | null {

        if (typeof num === "string") {
            const parsedNumber = parseFloat(num);

            if (isNaN(parsedNumber)) {
                return defaultValue
            } else {
                return parsedNumber;
            }
        }

        if (typeof num === "number") {
            return num
        }


        return defaultValue
    }


    export function tryGetDate(date: unknown, defaultValue: Date | null = null): Date | null {

        if (date instanceof Date) {
            return date;
        }

        if (typeof date === "string") {
            const formatToSecondsLuxon = luxon.DateTime.fromFormat(date, "yyyy-MM-dd HH:mm:ss");

            if (formatToSecondsLuxon.isValid) {
                return formatToSecondsLuxon.toJSDate();
            }

            const ISOLuxon = luxon.DateTime.fromISO(date);

            if (ISOLuxon.isValid) {
                return ISOLuxon.toJSDate();
            }

            const formatToMinuteLuxon = luxon.DateTime.fromFormat(date, "yyyy-MM-dd HH:mm");

            if (formatToMinuteLuxon.isValid) {
                return formatToMinuteLuxon.toJSDate();
            }
        }

        return defaultValue
    }

    export function tryGetString(num: unknown, defaultValue?: string): string | undefined {

        if (typeof num === "string") {
            return num;
        }

        if (typeof num === "number") {
            return num.toString();
        }

        if (Array.isArray(num)) {
            return num.join(",")
        }

        return defaultValue;
    }

    export function tryGetBoolean(value: unknown, defaultValue: boolean | null = null) {
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }
}

