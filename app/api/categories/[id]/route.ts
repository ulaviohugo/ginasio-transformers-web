import { adaptMiddleware, adaptRoute } from '@/app/main/adapters'
import {
	makeCountCategoryController,
	makeDeleteCategoryController,
	makeUpdateCategoryController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

type Params = {
	params: {
		id: number | string
	}
}

export async function PUT(req: Request, { params }: Params) {
	Object.assign(req, params)
	return adaptMiddleware(
		makeAuthMiddleware(),
		(request) => adaptRoute(makeUpdateCategoryController(), request),
		req
	)
}

export async function DELETE(req: Request, { params }: Params) {
	Object.assign(req, params)
	return adaptMiddleware(
		makeAuthMiddleware(),
		(request) => adaptRoute(makeDeleteCategoryController(), request),
		req
	)
}

export function GET(req: Request, { params }: Params) {
	if (params.id == 'count')
		return adaptMiddleware(
			makeAuthMiddleware(),
			(req) => adaptRoute(makeCountCategoryController(), req),
			req
		)
}
