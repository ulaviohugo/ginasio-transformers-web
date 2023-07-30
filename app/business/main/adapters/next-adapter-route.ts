import { Controller } from '../../presentation/protocols'

export const adaptRoute = async (controller: Controller, req?: Request) => {
  let body
  try {
    body = await req?.json()
  } catch (error) {
    body = {}
  }
  const httpResponse = await controller.handle(body)
  const success =
    httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299

  const responseData = JSON.stringify(
    success ? httpResponse.body : { error: httpResponse.body.message }
  )

  return new Response(responseData, {
    status: httpResponse.statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}
