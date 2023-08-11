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
}
