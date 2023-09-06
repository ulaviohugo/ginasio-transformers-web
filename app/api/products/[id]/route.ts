import { adaptMiddleware } from '@/main/adapters'
import { makeCountProductController, makeUpdateProductController } from '@/main/factories'
import { makeDeleteProductController } from '@/main/factories/controllers/product/delete-category-controller-factory'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

type Params = {
	params: {
		id: number | string
	}
}

export async function PUT(request: Request, { params }: Params) {
	Object.assign(request, params)
	return adaptMiddleware(makeAuthMiddleware(), request, makeUpdateProductController())
}

export async function DELETE(request: Request, { params }: Params) {
	Object.assign(request, params)
	return adaptMiddleware(makeAuthMiddleware(), request, makeDeleteProductController())
}

export function GET(request: Request, { params }: Params) {
	if (params.id == 'count')
		return adaptMiddleware(makeAuthMiddleware(), request, makeCountProductController())
}
