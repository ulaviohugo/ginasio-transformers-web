import { adaptRoute } from '@/app/main/adapters'
import { makeCountPurchaseController } from '@/app/main/factories'

export function GET() {
	return adaptRoute(makeCountPurchaseController())
}
