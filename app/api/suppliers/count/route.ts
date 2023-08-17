import { adaptRoute } from '@/app/main/adapters'
import { makeCountSupplierController } from '@/app/main/factories'

export function GET() {
	return adaptRoute(makeCountSupplierController())
}
