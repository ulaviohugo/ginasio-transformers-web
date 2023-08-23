import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeAddPurchaseController,
	makeLoadPurchaseController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddPurchaseController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadPurchaseController())
}
