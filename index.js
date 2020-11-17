"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializer = void 0;
require("./custom-types/express/index");
/**
 * @param payload The payload to serialize (in case of express it is `req.body`)
 * @param cdepth Current depth of object, if **`cdepth == options.maxNestingLevel`** then replace the entire value with `options.replaceWith`
 * @param options Serialization options
 */
function serializer(payload, cdepth, options) {
    var main = {};
    var maxDepth = typeof options.maxNestingLevel == 'number' ? (options.maxNestingLevel == 0 ? 1 : options.maxNestingLevel) : 1;
    for (var key in payload) {
        // check for object
        if (payload[key] instanceof Object) {
            // check if depth is limited, replace if needed
            if (cdepth === maxDepth) {
                main[key] = options.replaceWith;
            }
            else {
                // serialize the nested
                main[key] = serializer(payload[key], cdepth + 1, options);
            }
        }
        else {
            // add to main object if not to be checked
            main[key] = payload[key];
        }
    }
    return main;
}
exports.serializer = serializer;
/**
 * Middleware to be used in express for preventing nosql-injection
 * @param options Serialization options
 */
function default_1(options) {
    return function (req, _res, next) {
        // running the serializer
        req.protectedBody = serializer(req.body, 1, options);
        next();
    };
}
exports.default = default_1;
