import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeAddEmployeeController,
	makeLoadEmployeeController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadEmployeeController())
}

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddEmployeeController())
}
