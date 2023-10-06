import { QueryParams } from '@/data/protocols'
import { HttpResponse } from '@/data/protocols/http'

export interface Controller {
	handle(request: ControllerParams): Promise<HttpResponse>
}

export type ControllerParams<T extends object = {}> = T & {
	accountId: number
	queryParams?: QueryParams<T>
}
