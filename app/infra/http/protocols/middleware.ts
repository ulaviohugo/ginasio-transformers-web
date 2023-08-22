import { HttpResponse } from '@/app/data/protocols/http'

export interface Middleware<T = any> {
	handle: (httpRequest: T) => Promise<HttpResponse>
}
