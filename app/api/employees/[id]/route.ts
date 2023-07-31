import { adaptRoute } from '@/app/business/main/adapters'
import {
  makeDeleteEmployeeController,
  makeUpdateEmployeeController,
} from '@/app/business/main/factories'

type Params = {
  params: {
    id: number
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const newReq = { ...request, id: params.id }
  return adaptRoute(makeDeleteEmployeeController(), newReq)
}

export async function PUT(request: Request, { params }: Params) {
  ;(request as any).id = params.id
  return adaptRoute(makeUpdateEmployeeController(), request)
}
