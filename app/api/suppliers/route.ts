import { adaptRoute } from '@/app/main/adapters'
import {
	makeAddSupplierController,
	makeLoadSupplierController
} from '@/app/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAddSupplierController(), request)
}

export async function GET() {
	return adaptRoute(makeLoadSupplierController())
}
