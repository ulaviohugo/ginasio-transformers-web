import { adaptMiddleware } from '@/main/adapters'
import { makeAddSaleController, makeLoadSaleController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddSaleController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadSaleController())
}
