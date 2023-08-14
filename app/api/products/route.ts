import { adaptRoute } from '@/app/main/adapters'
import { makeAddProductController } from '@/app/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAddProductController(), request)
}
