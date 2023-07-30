import { adaptRoute } from '@/app/business/main/adapters'
import { makeLoadEmployeeController } from '@/app/business/main/factories'

export async function GET() {
  return adaptRoute(makeLoadEmployeeController())
}
