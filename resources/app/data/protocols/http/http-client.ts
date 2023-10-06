import { HttpRequestParams, HttpResponse } from '.'

export interface HttpClient<T = any, R = any> {
	request: (params: HttpRequestParams<T>) => Promise<HttpResponse<R>>
}
