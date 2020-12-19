// **
import { RequestHandler } from 'express'

interface Options {
  /**
   * The string you want replace nested object with
   */
  replaceWith: string

  /**
   * @deprecated Use `limit` instead
   */
  maxNestingLevel?: number

  /**
   * Max number of nesting to pass (default: 1)
   */
  limit?: number
}

/**
 * @param payload The payload to serialize (in case of express it is `req.body`)
 * @param cdepth Current depth of object, if **`cdepth == options.maxNestingLevel`** then replace the entire value with `options.replaceWith`
 * @param options Serialization options
 */
export function serializer(payload: any, cdepth: number, options: Options): void {
  const main: any = {}
  options.limit = options.limit || options.maxNestingLevel || 1
  const maxDepth = typeof options.limit == 'number' ? (options.limit == 0 ? 1 : options.limit) : 1

  for (const key in payload) {
    // check for object
    if (payload[key] instanceof Object) {
      // check if depth is limited, replace if needed
      if (cdepth === maxDepth) {
        main[key] = options.replaceWith
      } else {
        // serialize the nested
        main[key] = serializer(payload[key], cdepth + 1, options)
      }
    } else {
      // add to main object if not to be checked
      main[key] = payload[key]
    }
  }
  return main
}

export { Options }

/**
 * Middleware to be used in express for preventing nosql-injection
 * @param options Serialization options
 */
export default function (options: Options): RequestHandler {
  return (req, _res, next) => {
    // running the serializer
    req.protectedBody = serializer(req.body, 1, options)
    next()
  }
}
