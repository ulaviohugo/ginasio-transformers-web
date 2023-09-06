import { adaptMiddleware } from '@/main/adapters'
import {
	makeCountSaleController,
	makeDeleteSaleController,
	makeUpdateSaleController
} from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

type Params = {
	params: {
		id: number | string
	}
}

export async function PUT(request: Request, { params }: Params) {
	Object.assign(request, params)
	return adaptMiddleware(makeAuthMiddleware(), request, makeUpdateSaleController())
}

export async function DELETE(request: Request, { params }: Params) {
	Object.assign(request, params)
	return adaptMiddleware(makeAuthMiddleware(), request, makeDeleteSaleController())
}

export function GET(request: Request, { params }: Params) {
	if (params.id == 'count')
		return adaptMiddleware(makeAuthMiddleware(), request, makeCountSaleController())
}
