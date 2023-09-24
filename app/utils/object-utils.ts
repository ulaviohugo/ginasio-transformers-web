export class ObjectUtils {
	static isEmpty(param: any) {
		return !param || JSON.stringify(param) == '{}' || param == '{}'
	}

	static removeProps<T extends object = any>(param: T, props: (keyof T)[]): T {
		if (typeof param !== 'object' || param === null) {
			throw new Error('O parâmetro "param" deve ser um objeto.')
		}
		const body: Partial<T> = { ...param }
		for (const prop of props) {
			if (prop in body) {
				delete body[prop]
			}
		}
		return body as T
	}

	static trimValues<T extends object = any>(obj: T): T {
		if (!obj) return {} as T
		const body: any = { ...obj }
		const newObject: any = {}
		for (const key in body) {
			if (key in body) {
				const item = body[key]
				newObject[key] = typeof item == 'string' ? item.toString().trim() : item
			}
		}
		return newObject
	}

	static convertToObject<T extends object = any>(data: T[]): T {
		if (!data) return {} as T
		let obj = data
		if (typeof data == 'string') {
			obj = JSON.parse(data)
		}
		if (Array.isArray(obj)) {
			return obj.reduce((prev: any, current, index) => {
				return { ...prev, [index]: current }
			}, {})
		}
		return obj as T
	}

	static toQueryParams(params: any, url?: string) {
		const esc = encodeURIComponent
		const queryParams = Object.keys(params)
			.map((key) => esc(key) + '=' + esc(params[key]))
			.join('&')

		const queryMergedWithUrl =
			(url && url.indexOf('?') < 0 ? url + '?' : '') + queryParams
		return queryMergedWithUrl
	}
}
