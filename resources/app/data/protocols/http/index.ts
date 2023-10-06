export * from './http-client'

export type HeaderParams = HeadersInit & { 'Content-Type': 'application/json' }

export type HttpRequestParams<T = any> = {
	url: string
	method: 'post' | 'get' | 'put' | 'delete'
	body?: T
	headers?: HeaderParams
	params?: object
}

export type HttpResponse<T = any> = {
	statusCode: HttpStatusCode
	body?: T
	headers?: object
}

export enum HttpStatusCode {
	ok = 200,
	okCreated = 201,
	noContent = 204,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	notFound = 404,
	serverError = 500
}
