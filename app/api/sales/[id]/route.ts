import { adaptRoute } from '@/app/main/adapters'
import {
	makeCountSaleController,
	makeDeleteSaleController,
	makeUpdateSaleController
} from '@/app/main/factories'

type Params = {
	params: {
		id: number | string
	}
}

export async function PUT(request: Request, { params }: Params) {
	;(request as any).id = params.id
	return adaptRoute(makeUpdateSaleController(), request)
}

export async function DELETE(request: Request, { params }: Params) {
	const newReq = { ...request, id: params.id }
	return adaptRoute(makeDeleteSaleController(), newReq)
}

export function GET(_request: Request, { params }: Params) {
	if (params.id == 'count') return adaptRoute(makeCountSaleController())
}