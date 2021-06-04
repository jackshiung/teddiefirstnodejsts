export namespace Enum {
    export function isValueExist(source: any, value: any): boolean {
        return Object.values(source).includes(value);
    }
}