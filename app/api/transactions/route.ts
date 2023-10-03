import { adaptMiddleware } from '@/main/adapters'
import {
	makeAddTransactionController,
	makeLoadTransactionsController
} from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadTransactionsController())
}

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddTransactionController())
}
