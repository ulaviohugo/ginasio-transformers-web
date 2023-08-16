import { adaptRoute } from '@/app/main/adapters'
import { makeUpdateProductController } from '@/app/main/factories'
import { makeDeleteProductController } from '@/app/main/factories/controllers/product/delete-category-controller-factory'

type Params = {
	params: {
		id: number
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
