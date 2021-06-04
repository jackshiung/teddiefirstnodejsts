export namespace Json {
    export function success(data?: any, total?: number, nextId?: number, hasNext?: boolean) {
        let json: any = { success: true };
        if (data || total) {
            json.result = {};
            json.result.data = data;
            json.result.total = total;
            json.result.nextId = nextId;
            json.result.hasNext = hasNext;
        }
        return json;
    }

    export function error(err?: any) {
        let json: any = { success: false };
        if (err) {
            json.error = {
                status: err.status,
                substatus: err.substatus, // for wishvision
                type: err.type,
                code: err.code, // for wishvision
                message: err.message
            };
        }
        return json;
    }
}