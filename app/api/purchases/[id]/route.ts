import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeCountPurchaseController,
	makeDeletePurchaseController,
	makeUpdatePurchaseController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

type Params = {
	params: {
		id: number | string
	}
}

export async function PUT(request: Request, { params }: Params) {
	Object.assign(request, params)
	return adaptMiddleware(makeAuthMiddleware(), request, makeUpdatePurchaseController())
}

export async function DELETE(request: Request, { params }: Params) {
	Object.assign(request, params)
	return adaptMiddleware(makeAuthMiddleware(), request, makeDeletePurchaseController())
}

export function GET(request: Request, { params }: Params) {
	if (params.id == 'count')
		return adaptMiddleware(makeAuthMiddleware(), request, makeCountPurchaseController())
}
