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

	static removeDuplicated<T = string>(data: string[]): T[] {
		if (!data) return [] as T[]
		const uniqueElements: any = {}

		return data.reduce((filteredData: any, item) => {
			const lowerCaseWord = String(item)?.toLocaleLowerCase()
			if (!uniqueElements[lowerCaseWord]) {
				uniqueElements[lowerCaseWord] = true
				filteredData.push(item)
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

	static convertToArray(data: object) {
		return Object.values(data)
	}
}
