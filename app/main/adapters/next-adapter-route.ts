import url from 'url'
import querystring from 'querystring'
import { Controller } from '@/infra/http/protocols'
import { ObjectUtils } from '@/utils'
import { adaptResponse } from '.'

export const adaptRoute = async (controller: Controller, req?: Request) => {
	let data: any = {}
	const queryParams = queryParamsToObject(req)

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
	const handledRequest: any = req

	data = {
		...data,
		id: handledRequest?.id,
		accountId: handledRequest?.accountId,
		queryParams
	}

	const { body, statusCode } = await controller.handle(data)
	const success = statusCode >= 200 && statusCode <= 299
	const response = success ? body : { error: body.message }

	return adaptResponse({ body: response, statusCode })
}

const queryParamsToObject = (req?: Request) => {
	if (!req) return
	const urlPaths = url.parse(req?.url)
	let queryParams: any
	if (urlPaths.query) {
		queryParams = querystring.parse(urlPaths.query)
		queryParams = Object.keys(queryParams).reduce((prev, current: any) => {
			const currentValue = queryParams[current]
			return {
				...prev,
				[current]:
					typeof currentValue == 'string' ? JSON.parse(currentValue) : currentValue
			}
		}, {})
	}
	return queryParams
}
