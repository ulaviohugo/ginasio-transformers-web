import { adaptRoute } from '@/app/main/adapters'
import { makeCountCategoryController } from '@/app/main/factories'

export function GET() {
	return adaptRoute(makeCountCategoryController())
}
