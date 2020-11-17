import { NextFunction, Request, Response } from 'express'
import './custom-types/express/index'

interface Options {
  // the string you want replace nested object with
  replaceWith: string
  // the limit of the nesting to parse (default: 1)
  maxNestingLevel: number
}

/**
 * @param payload The payload to serialize (in case of express it is `req.body`)
 * @param cdepth Current depth of object, if **`cdepth == options.maxNestingLevel`** then replace the entire value with `options.replaceWith`
 * @param options Serialization options
 */
export function serializer(payload: any, cdepth: number, options: Options): void {
  const main: any = {}
  const maxDepth = typeof options.maxNestingLevel == 'number' ? (options.maxNestingLevel == 0 ? 1 : options.maxNestingLevel) : 1

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
export default function (options: Options): (req: Request, res: Response, next: NextFunction) => any {
  return (req, _res, next) => {
    // running the serializer
    req.protectedBody = serializer(req.body, 1, options)
    next()
  }
}
