import { adaptMiddleware } from '@/main/adapters'
import { makeAddSupplierController, makeLoadSupplierController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddSupplierController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadSupplierController())
}
