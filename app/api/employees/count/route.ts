import { adaptRoute } from '@/app/main/adapters'
import { makeCountEmployeeController } from '@/app/main/factories'

export function GET() {
	return adaptRoute(makeCountEmployeeController())
}
