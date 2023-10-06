import { HttpResponse } from '@/data/protocols/http'
import { NotFoundError, ServerError, UnauthorizedError } from '@/infra/http/errors'

export const ok = (data: any): HttpResponse => ({ body: data, statusCode: 200 })

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: error
})

export const unauthorized = (message?: string): HttpResponse => ({
	statusCode: 401,
	body: new UnauthorizedError(message)
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
