import { adaptRoute } from '@/app/main/adapters'
import {
	makeDeletePurchaseController,
	makeUpdatePurchaseController
} from '@/app/main/factories'

type Params = {
	params: {
		id: number
	}
}

export async function PUT(request: Request, { params }: Params) {
	;(request as any).id = params.id
	return adaptRoute(makeUpdatePurchaseController(), request)
}

export async function DELETE(request: Request, { params }: Params) {
	const newReq = { ...request, id: params.id }
	return adaptRoute(makeDeletePurchaseController(), newReq)
}
