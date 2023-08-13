import { Controller } from '@/app/infra/http/protocols'
import { ObjectUtils } from '@/app/utils'
import { adaptResponse } from '.'

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
