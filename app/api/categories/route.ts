import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeAddCategoryController,
	makeLoadCategoryController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddCategoryController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadCategoryController())
}
