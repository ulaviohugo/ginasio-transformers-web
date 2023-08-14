import { adaptRoute } from '@/app/main/adapters'
import {
	makeAddCategoryController,
	makeLoadCategoryController
} from '@/app/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAddCategoryController(), request)
}

export async function GET() {
	return adaptRoute(makeLoadCategoryController())
}
