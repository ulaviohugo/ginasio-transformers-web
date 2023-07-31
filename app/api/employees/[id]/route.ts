import { adaptRoute } from '@/app/business/main/adapters'
import { makeDeleteEmployeeController } from '@/app/business/main/factories'

type Params = {
  params: {
    id: number
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const newReq = { ...request, id: params.id }
  return adaptRoute(makeDeleteEmployeeController(), newReq)
}
