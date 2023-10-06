type OrderProps<T> = {
	data: T[]
	field?: keyof T
	orderOption?: 'asc' | 'desc'
}

export class ArrayUtils {
	static order<T>({ data, field, orderOption = 'asc' }: OrderProps<T>): T[] {
		const compareFn = (a: any, b: any) => {
			if (typeof a === 'string' && typeof b === 'string') {
				return orderOption === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
			}
			return orderOption === 'asc' ? a - b : b - a
		}

		if (field && data[0]?.hasOwnProperty(field)) {
			return [...data].sort((a, b) => compareFn(a[field], b[field]))
		} else {
			return [...data].sort(compareFn)
		}
	}

	static removeDuplicated<T = string>(data: T[], field?: keyof T): T[] {
		if (!data) return [] as T[]
		const uniqueElements: any = {}

		return data.reduce((filteredData: any, current) => {
			let index
			if (typeof current == 'string') {
				index = String(current)?.toLocaleLowerCase()
			} else if (field && current && current?.hasOwnProperty(field)) {
				index = String(current[field])?.toLocaleLowerCase()
			}
			if (index && !uniqueElements[index]) {
				uniqueElements[index] = true
				filteredData.push(current)
			}
			return filteredData
		}, [])
	}

	static getGreaterValue(values: number[]) {
		return values.reduce((greater, valorAtual) => {
			if (valorAtual > greater) {
				return valorAtual
			} else {
				return greater
			}
		}, 0)
	}

	static convertToArray(data: any): [] {
		let obj = data
		if (typeof data == 'string') {
			obj = JSON.parse(data)
		}
		if (Array.isArray(obj)) {
			return obj as any
		}
		if (typeof obj == 'object') {
			return Object.values(obj as any) as any
		}
		return obj as any
	}
}
