import { adaptRoute } from '@/app/main/adapters'
import { makeCountProductController } from '@/app/main/factories'

export function GET() {
	return adaptRoute(makeCountProductController())
}
