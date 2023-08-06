import { Controller } from '@/app/infra/http/protocols'

export const adaptRoute = async (controller: Controller, req?: Request) => {
  let data = {}
  try {
    data = await req?.json()
  } catch (error) {}
  data = { ...data, id: (req as any)?.id }

  const { body, statusCode } = await controller.handle(data)
  const success = statusCode >= 200 && statusCode <= 299
  const responseData = JSON.stringify(success ? body : { error: body.message })

  return new Response(responseData, {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}
