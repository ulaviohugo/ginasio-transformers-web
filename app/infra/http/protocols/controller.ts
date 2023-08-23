import { HttpResponse } from '@/app/data/protocols/http'

export interface Controller<T = any> {
	handle(request: ControllerParams<T>): Promise<HttpResponse>
}

export type ControllerParams<T> = T & { accountId: number }
