import 'express'
declare module 'express' {
  interface Request {
    protectedBody: any
  }
}

export default routeHandler
