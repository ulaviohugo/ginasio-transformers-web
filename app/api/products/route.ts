import { adaptMiddleware } from '@/main/adapters'
import { makeAddProductController, makeLoadProductController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddProductController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadProductController())
}
