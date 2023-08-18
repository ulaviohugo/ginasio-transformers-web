import { adaptRoute } from '@/app/main/adapters'
import {
	makeCountProductController,
	makeUpdateProductController
} from '@/app/main/factories'
import { makeDeleteProductController } from '@/app/main/factories/controllers/product/delete-category-controller-factory'

type Params = {
	params: {
		id: number | string
	}
}

export async function PUT(request: Request, { params }: Params) {
	;(request as any).id = params.id
	return adaptRoute(makeUpdateProductController(), request)
}

export async function DELETE(request: Request, { params }: Params) {
	;(request as any).id = params.id
	return adaptRoute(makeDeleteProductController(), request)
}

export function GET(_request: Request, { params }: Params) {
	if (params.id == 'count') return adaptRoute(makeCountProductController())
}
