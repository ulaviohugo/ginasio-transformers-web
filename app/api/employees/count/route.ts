import { adaptRoute } from '@/app/main/adapters'
import { makeCountEmployeeController } from '@/app/main/factories/controllers/count-employee-controller-factory'

export function GET() {
	return adaptRoute(makeCountEmployeeController())
}
