import { HttpResponse } from '@/app/data/protocols/http'

export interface Controller {
	handle(request: ControllerParams): Promise<HttpResponse>
}

export type ControllerParams<T extends object = {}> = T & { accountId: number }
