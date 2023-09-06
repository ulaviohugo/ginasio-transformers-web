import { adaptMiddleware } from '@/main/adapters'
import { makeAddCategoryController, makeLoadCategoryController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddCategoryController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadCategoryController())
}
