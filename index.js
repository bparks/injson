
class injson {
    static inflate(obj) {
        if (typeof obj === 'string') {
            return this.inflate(JSON.parse(obj));
        }
        var constructor;
        if (!!obj.$type) {
            var invocationTarget;
            if (typeof window !== 'undefined') {
                invocationTarget = window;
            } else {
                invocationTarget = global;
            }
            var parts = obj.$type.split('.');
            for (var i = 0; i < parts.length; i++) {
                if (typeof invocationTarget === 'undefined')
                    throw new Error(`The type ${obj.$type} does not exist`);
                invocationTarget = invocationTarget[parts[i]];
            }
            constructor = invocationTarget;
        }
        if (typeof constructor === 'undefined') {
            constructor = Object;
        }
        var baseObj = constructor.call();
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                if (typeof value === 'object') {
                    baseObj[key] = this.inflate(obj[key]);
                }
                else {
                    baseObj[key] = obj[key];
                }
            }
        }
        return baseObj;
    }
}
exports.default = injson;
