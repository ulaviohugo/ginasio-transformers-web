import { HttpResponse } from '../protocols'

export const ok = (data: any): HttpResponse => ({ body: data, statusCode: 200 })

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new Error('UnauthorizedError'),
})

export const serverError = (error: Error | any): HttpResponse => ({
  statusCode: 500,
  body: new Error(error.stack),
})
