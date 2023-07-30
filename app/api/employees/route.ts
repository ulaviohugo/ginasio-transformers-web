import { adaptRoute } from '@/app/business/main/adapters'
import {
  makeAddEmployeeController,
  makeLoadEmployeeController,
} from '@/app/business/main/factories'

export async function GET() {
  return adaptRoute(makeLoadEmployeeController())
}

export async function POST(request: Request) {
  return adaptRoute(makeAddEmployeeController(), request)
}
