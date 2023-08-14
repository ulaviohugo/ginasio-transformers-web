import { adaptRoute } from '@/app/main/adapters'
import { makeAddCategoryController } from '@/app/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAddCategoryController(), request)
}
