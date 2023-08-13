export class ObjectUtils {
	static isEmpty(param: any) {
		return !param || JSON.stringify(param) == '{}'
	}

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
}
