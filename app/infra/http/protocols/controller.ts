import { HttpResponse } from '@/app/data/protocols/http'

export interface Controller<T = any> {
	handle(request: T): Promise<HttpResponse>
}
