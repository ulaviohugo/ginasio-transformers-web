import { adaptRoute } from '@/app/main/adapters'
import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeAddCategoryController,
	makeLoadCategoryController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function POST(req: Request) {
	return adaptMiddleware(
		makeAuthMiddleware(),
		(request) => adaptRoute(makeAddCategoryController(), request),
		req
	)
}

export async function GET(req: Request) {
	return adaptMiddleware(
		makeAuthMiddleware(),
		(request) => adaptRoute(makeLoadCategoryController(), request),
		req
	)
}
