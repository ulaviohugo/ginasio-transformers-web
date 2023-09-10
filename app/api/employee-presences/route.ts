import { adaptMiddleware } from '@/main/adapters'
import {
	makeAddEmployeePresenceController,
	makeLoadEmployeePresenceController
} from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export async function GET(request: Request) {
	return adaptMiddleware(
		makeAuthMiddleware(),
		request,
		makeLoadEmployeePresenceController()
	)
}

export async function POST(request: Request) {
	return adaptMiddleware(
		makeAuthMiddleware(),
		request,
		makeAddEmployeePresenceController()
	)
}