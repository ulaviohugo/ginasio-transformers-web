import { adaptRoute } from '@/app/main/adapters'
import {
	makeAddPurchaseController,
	makeLoadPurchaseController
} from '@/app/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAddPurchaseController(), request)
}

export async function GET() {
	return adaptRoute(makeLoadPurchaseController())
}
