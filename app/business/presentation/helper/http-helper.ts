import { HttpResponse } from '../protocols'

export const ok = (data: any): HttpResponse => ({ body: data, statusCode: 200 })

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new Error('UnauthorizedError'),
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const serverError = (error: Error | any): HttpResponse => ({
  statusCode: 500,
  body: new Error(error.message),
})
