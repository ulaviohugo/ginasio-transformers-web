import { adaptMiddleware } from '@/app/main/adapters'
import { makeLoadCurrentUserController } from '@/app/main/factories'
import { makeAuthMiddleware } from '@/app/main/factories/middlewares'

export const GET = (request: Request) => handle(request)
export const POST = (request: Request) => handle(request)

const handle = (request: Request) =>
	adaptMiddleware(makeAuthMiddleware(), request, makeLoadCurrentUserController())
