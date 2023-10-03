import { adaptMiddleware } from '@/main/adapters'
import {
	makeAddCashRegisterController,
	makeLoadCashRegisterController
} from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadCashRegisterController())
}

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddCashRegisterController())
}
