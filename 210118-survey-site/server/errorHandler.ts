import { NextFunction, RequestHandler } from "express"

const asyncHandler = (fn: RequestHandler): RequestHandler | NextFunction => {
  return async function handler(...args) {
    const nextFn = args[args.length - 1] as NextFunction
    try {
      await Promise.resolve(fn(...args))
    } catch (err) {
      nextFn(err)
    }
  }
}

export default asyncHandler
