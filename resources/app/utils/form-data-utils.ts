import { ObjectUtils } from '.'

export class FormDataUtils {
	static createFormData(param: object): FormData {
		if (ObjectUtils.isEmpty(param)) return null as any

		const values = Object.values(param)
		const keys = Object.keys(param)
		const formData = new FormData()
		for (let i = 0; i < values.length; i++) {
			const key = keys[i]
			const value = values[i] ?? ''
			let data = value
			if (value instanceof File == false && typeof value == 'object') {
				data = JSON.stringify(value)
			}
			formData.append(key, data)
		}
		return formData
	}
}
