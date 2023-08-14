import { adaptRoute } from '@/app/main/adapters'
import { makeAddProductController, makeLoadProductController } from '@/app/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAddProductController(), request)
}

export async function GET() {
	return adaptRoute(makeLoadProductController())
}
