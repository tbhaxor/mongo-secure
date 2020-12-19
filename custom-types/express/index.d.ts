import 'express'
declare module 'express' {
  // Inject additional properties on express.Request
  interface Request {
    protectedBody: any
  }
}

declare global {
  namespace Express {
    // Inject additional properties on express.Request
    interface Request {
      protectedBody: any
    }
  }
}
