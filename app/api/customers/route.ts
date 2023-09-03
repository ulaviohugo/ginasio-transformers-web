import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeAddCustomerController,
	makeLoadCustomerController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadCustomerController())
}

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddCustomerController())
}
