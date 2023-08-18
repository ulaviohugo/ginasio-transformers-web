import { HttpResponse } from '@/app/data/protocols/http'
import { NotFoundError, ServerError, UnauthorizedError } from '../errors'

export const ok = (data: any): HttpResponse => ({ body: data, statusCode: 200 })

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: error
})

export const unauthorized = (): HttpResponse => ({
	statusCode: 401,
	body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
	statusCode: 403,
	body: error
})

export const notFound = (message?: string): HttpResponse => ({
	statusCode: 404,
	body: new NotFoundError(message)
})

export const serverError = (error: Error | any): HttpResponse => ({
	statusCode: 500,
	body: new ServerError(error.message)
})
