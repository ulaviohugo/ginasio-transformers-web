import { adaptMiddleware } from '@/main/adapters'
import { makeLoadCurrentUserController } from '@/main/factories'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export const GET = (request: Request) => handle(request)
export const POST = (request: Request) => handle(request)

const handle = (request: Request) =>
	adaptMiddleware(makeAuthMiddleware(), request, makeLoadCurrentUserController())
