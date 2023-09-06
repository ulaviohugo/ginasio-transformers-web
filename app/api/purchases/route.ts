import { adaptMiddleware } from '@/main/adapters'
import { makeAddPurchaseController, makeLoadPurchaseController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddPurchaseController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadPurchaseController())
}
