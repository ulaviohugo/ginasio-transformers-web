import { adaptRoute } from '@/app/main/adapters'
import { makeAddSaleController, makeLoadSaleController } from '@/app/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAddSaleController(), request)
}

export async function GET() {
	return adaptRoute(makeLoadSaleController())
}
