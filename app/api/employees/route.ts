import { adaptMiddleware } from '@/main/adapters'
import { makeAddEmployeeController, makeLoadEmployeeController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadEmployeeController())
}

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddEmployeeController())
}
