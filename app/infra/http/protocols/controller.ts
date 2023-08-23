import { HttpResponse } from '@/app/data/protocols/http'

export interface Controller<T = any> {
	handle(request: ControllerParam<T>): Promise<HttpResponse>
}

export type ControllerParam<T> = T & { accountId: number }
