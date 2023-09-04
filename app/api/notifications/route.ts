import { adaptMiddleware } from '@/app/main/adapters'
import {
	makeAddNotificationController,
	makeLoadNotificationController
} from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeLoadNotificationController())
}

export async function POST(request: Request) {
	return adaptMiddleware(makeAuthMiddleware(), request, makeAddNotificationController())
}
