import { adaptRoute } from '@/app/main/adapters'
import {
	makeDeleteEmployeeController,
	makeUpdateEmployeeController
} from '@/app/main/factories'

type Params = {
	params: {
		id: number
	}
}

export async function PUT(request: Request, { params }: Params) {
	;(request as any).id = params.id
	return adaptRoute(makeUpdateEmployeeController(), request)
}

export async function DELETE(request: Request, { params }: Params) {
	const newReq = { ...request, id: params.id }
	return adaptRoute(makeDeleteEmployeeController(), newReq)
}
