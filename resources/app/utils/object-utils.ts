type KeyTypeProps = string | number

type ConvertToObjectProps<T, KEY_TYPE extends KeyTypeProps> = {
	[key in KEY_TYPE]: T
}
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

	static convertToObject<T extends object = any, KEY_TYPE extends KeyTypeProps = number>(
		data: T[],
		keyIndex?: keyof T,
		keyValue?: keyof T
	): ConvertToObjectProps<T, KEY_TYPE> {
		if (!data) return {} as any
		let obj = data
		if (typeof data == 'string') {
			obj = JSON.parse(data)
		}
		if (Array.isArray(obj)) {
			return obj.reduce((prev: any, current: any, index) => {
				if (typeof current == 'object' && keyIndex && keyIndex in current) {
					return {
						...prev,
						[current[keyIndex]]: keyValue ? current[keyValue] : current
					}
				}
				if (typeof current == 'string' || typeof current == 'number') {
					return { ...prev, [current as any]: current }
				}
				return { ...prev, [index]: current }
			}, {})
		}
		return obj as any
	}

	static toQueryParams(params: any, url?: string) {
		const esc = encodeURIComponent
		const queryParams = Object.keys(params)
			.map((key) => {
				let value = params[key]
				if (typeof value != 'string' && typeof value != 'number') {
					value = JSON.stringify(value)
				}
				return esc(key) + '=' + esc(value)
			})
			.join('&')

		const queryMergedWithUrl =
			(url && url.indexOf('?') < 0 ? url + '?' : '') + queryParams
		return queryMergedWithUrl
	}
}
