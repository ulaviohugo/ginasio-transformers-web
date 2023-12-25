export * from './http-client'

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequestParams<T = any> = {
	url: string
	method: HttpMethod
	body?: T
	headers?: any
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
	unprocessable = 422,
	serverError = 500
}
