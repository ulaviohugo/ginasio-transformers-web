import { adaptRoute } from '@/app/main/adapters'
import { makeUpdateProductController } from '@/app/main/factories'

type Params = {
	params: {
		id: number
	}
}

export async function PUT(request: Request, { params }: Params) {
	;(request as any).id = params.id
	return adaptRoute(makeUpdateProductController(), request)
}
