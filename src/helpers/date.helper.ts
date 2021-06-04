import * as moment from 'moment';

export namespace Date {
    export enum Day {
        Sunday,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday
    }

    export interface Config {
        workingDays?: Day[],
        holidays?: string[],
        makeupDays?: string[]
    }

    const defaultConfig: Config = {
        workingDays: [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday],
        holidays: [],
        makeupDays: []
    }

    let config = defaultConfig;

    export function now(): moment.Moment {
        return moment();
    }

    export function timestamp(): number {
        return now().toDate().getTime();
    }

    export function today(): moment.Moment {
        return moment().startOf('day');
    }

    export function yesterday(): moment.Moment {
        return addDays(moment(), -1).startOf('day');
    }

    export function tomorrow(): moment.Moment {
        return addDays(moment(), +1).startOf('day');
    }

    export function startOfMonth(value: moment.Moment): moment.Moment {
        return moment(value).startOf('month').startOf('day');
    }

    export function endOfMonth(value: moment.Moment): moment.Moment {
        return moment(value).endOf('month').startOf('day');
    }

    export function startOfWeek(value: moment.Moment): moment.Moment {
        return moment(value).startOf('week').startOf('day');
    }

    export function endOfWeek(value: moment.Moment): moment.Moment {
        return moment(value).endOf('week').startOf('day');
    }

    export function parse(value: string, format: string = 'YYYY-MM-DD'): moment.Moment {
        return moment(value, format);
    }

    export function isDate(value: any): boolean {
        if (!value) return false;
        return moment(value).isValid();
    }

    export function addHours(value: moment.Moment, hours: number): moment.Moment {
        return moment(value).add(hours, 'hours');
    }

    export function addDays(value: moment.Moment, days: number): moment.Moment {
        return moment(value).add(days, 'days');
    }

    export function addMonths(value: moment.Moment, months: number): moment.Moment {
        return moment(value).add(months, 'months');
    }

    export function format(value: moment.Moment, input: string): string {
        return moment(value).format(input);
    }

    export function formatDate(value: moment.Moment): string {
        return moment(value).format('YYYY-MM-DD');
    }

    export function formatDateNoSymbol(value: moment.Moment): string {
        return moment(value).format('YYYYMMDD');
    }

    export function formatDateSlash(value: moment.Moment): string {
        return moment(value).format('YYYY/MM/DD');
    }

    export function formatDateTime(value: moment.Moment): string {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }

    export function formatDateTimeSlash(value: moment.Moment): string {
        return moment(value).format('YYYY/MM/DD HH:mm:ss');
    }

    export function formatTime(value: moment.Moment): string {
        return moment(value).format('HH:mm:ss');
    }

    export function formatTimeWithoutSecond(value: moment.Moment | Date | string, valueFormat?: string): string {
        return moment(value, valueFormat).format('HH:mm');
    }

    export function formatMMDD(value: moment.Moment): string {
        return moment(value).format('MMDD');
    }

    export function formatMMDDSlash(value: moment.Moment): string {
        return moment(value).format('MM/DD');
    }

    export function formatMMDDDesh(value: moment.Moment): string {
        return moment(value).format('MM-DD');
    }

    export function expirationDate(minutes: number): moment.Moment {
        return moment().add(minutes, 'minutes');
    }

    export function timeAtStart(value: any): moment.Moment {
        let date = moment(value);
        return date.startOf('day');
    }

    export function timeAtEnd(value: any): moment.Moment {
        let date = moment(value);
        return date.endOf('day');
    }

    export function isSameDay(date1: moment.Moment, date2: moment.Moment): boolean {
        return date1.isSame(date2, 'day');
    }

    export function isWorkingDay(date: moment.Moment) {
        let workingDays = config.workingDays;
        if (!workingDays) workingDays = [];
        const length = workingDays.filter(workingDay => {
            return moment(date).weekday() === workingDay
        }).length;
        return length > 0;
    }

    export function isHoliday(date: moment.Moment) {
        let holidays = config.holidays;
        if (!holidays) holidays = [];
        const length = holidays.filter(holiday => {
            return isSameDay(moment(holiday), date);
        }).length;
        return length > 0;
    }

    export function isMakeupDay(date: moment.Moment) {
        let makeupDays = config.makeupDays;
        if (!makeupDays) makeupDays = [];
        const length = makeupDays.filter(makeupDay => {
            return isSameDay(moment(makeupDay), date)
        }).length;
        return length > 0;
    }

    export function isBusinessDay(date: moment.Moment) {
        if (isMakeupDay(date)) return true;
        if (isHoliday(date)) return false;
        if (isWorkingDay(date)) return true;
        else return false;
    }

    export function addBusinessDays(date: Date, amount: number): moment.Moment {
        let restAmount = amount
        let current = moment(date).startOf('day');

        while (restAmount > 0) {
            current = current.clone().add(1, 'day');
            if (isBusinessDay(current)) {
                restAmount = restAmount - 1;
            }
        }

        return current;
    }

    export function subtractBusinessDays(date: Date, amount: number): moment.Moment {
        let restAmount = amount;
        let current = moment(date).startOf('day');

        while (restAmount > 0) {
            current = current.clone().subtract(1, 'day');
            if (isBusinessDay(current)) {
                restAmount = restAmount - 1;
            }
        }

        return current;
    }

    export function setConfig(newConfig: Config) {
        config = Object.assign(config, newConfig);
    }
}
