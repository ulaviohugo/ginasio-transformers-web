export class ObjectUtils {
	static removeProps<T extends object = any>(param: T, props: (keyof T)[]) {
		if (typeof param !== 'object' || param === null) {
			throw new Error('O parâmetro "param" deve ser um objeto.')
		}
		const body: Partial<T> = { ...param }
		for (const prop of props) {
			if (prop in body) {
				delete body[prop]
			}
		}
		return body
	}

	static trimValues(obj: object) {
		if (!obj) return {}
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
}
