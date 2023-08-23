import { adaptMiddleware } from '@/app/main/adapters'
import { makeAddSaleController, makeLoadSaleController } from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddSaleController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadSaleController())
}
