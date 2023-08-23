import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeAddSupplierController,
	makeLoadSupplierController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddSupplierController())
}

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadSupplierController())
}
