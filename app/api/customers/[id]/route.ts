import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeCountCustomerController,
	makeDeleteCustomerController,
	makeUpdateCustomerController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

type Params = {
	params: {
		id: number | string
	}
}

export async function PUT(request: Request, { params }: Params) {
	Object.assign(request, params)
	return adaptMiddleware(makeAuthMiddleware(), request, makeUpdateCustomerController())
}

export async function DELETE(request: Request, { params }: Params) {
	Object.assign(request, params)
	return adaptMiddleware(makeAuthMiddleware(), request, makeDeleteCustomerController())
}

export function GET(request: Request, { params }: Params) {
	if (params.id == 'count')
		return adaptMiddleware(makeAuthMiddleware(), request, makeCountCustomerController())
}
