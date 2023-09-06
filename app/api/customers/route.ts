import { adaptMiddleware } from '@/main/adapters'
import { makeAddCustomerController, makeLoadCustomerController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadCustomerController())
}

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddCustomerController())
}
