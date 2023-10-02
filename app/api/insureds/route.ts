import { adaptMiddleware } from '@/main/adapters'
import { makeAddInsuredController, makeLoadInsuredsController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadInsuredsController())
}

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddInsuredController())
}
