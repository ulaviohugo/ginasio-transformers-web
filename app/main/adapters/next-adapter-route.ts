import { HttpResponse } from '@/app/data/protocols/http'
import { Controller } from '@/app/infra/http/protocols'
import { ObjectUtils } from '@/app/utils'

export const adaptRoute = async (controller: Controller, req?: Request) => {
	let data = {}
	try {
		const form = await req?.formData()
		if (form) {
			form?.forEach((value, key) => {
				Object.assign(data, { [key]: value })
			})
		}
	} catch (error: any) {}

	if (ObjectUtils.isEmpty(data)) {
		try {
			data = await req?.json()
		} catch (error) {}
	}

	data = { ...data, id: (req as any)?.id }

	const { body, statusCode } = await controller.handle(data)
	const success = statusCode >= 200 && statusCode <= 299
	const response = success ? body : { error: body.message }

	return adaptResponse({ body: response, statusCode })
}

export const adaptResponse = ({ body, statusCode, headers }: HttpResponse) => {
	const httpResponse = typeof body == 'string' ? body : JSON.stringify(body)

	return new Response(httpResponse, {
		status: statusCode,
		headers: { ...headers, 'Content-Type': 'application/json' }
	})
}
