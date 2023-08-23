import { adaptMiddleware } from '@/app/main/adapters'
import { makeAddProductController, makeLoadProductController } from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddProductController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadProductController())
}
