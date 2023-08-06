import { adaptRoute } from '@/app/main/adapters'
import {
	makeAddEmployeeController,
	makeLoadEmployeeController
} from '@/app/main/factories'

export async function GET() {
	return adaptRoute(makeLoadEmployeeController())
}

export async function POST(request: Request) {
	return adaptRoute(makeAddEmployeeController(), request)
}
