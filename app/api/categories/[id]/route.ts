import { adaptRoute } from '@/app/main/adapters'
import {
	makeCountCategoryController,
	makeDeleteCategoryController,
	makeUpdateCategoryController
} from '@/app/main/factories'

type Params = {
	params: {
		id: number | string
	}
}

export async function PUT(request: Request, { params }: Params) {
	;(request as any).id = params.id
	return adaptRoute(makeUpdateCategoryController(), request)
}

export async function DELETE(request: Request, { params }: Params) {
	;(request as any).id = params.id
	return adaptRoute(makeDeleteCategoryController(), request)
}

export function GET(_request: Request, { params }: Params) {
	if (params.id == 'count') return adaptRoute(makeCountCategoryController())
}
