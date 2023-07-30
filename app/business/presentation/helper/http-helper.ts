import { ServerError, UnauthorizedError } from '../errors'
import { HttpResponse } from '../protocols'

export const ok = (data: any): HttpResponse => ({ body: data, statusCode: 200 })

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const serverError = (error: Error | any): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
})
