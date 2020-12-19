import './custom-types/express/index'
import { RequestHandler } from 'express'
interface Options {
  replaceWith: string
  maxNestingLevel: number
}
/**
 * @param payload The payload to serialize (in case of express it is `req.body`)
 * @param cdepth Current depth of object, if **`cdepth == options.maxNestingLevel`** then replace the entire value with `options.replaceWith`
 * @param options Serialization options
 */
export declare function serializer(payload: any, cdepth: number, options: Options): void
export { Options }
/**
 * Middleware to be used in express for preventing nosql-injection
 * @param options Serialization options
 */
export default function (options: Options): RequestHandler
//# sourceMappingURL=index.d.ts.map
