export class DateUtils {
	static getDate(dateParam: Date | string, separator = '-') {
		if (!dateParam) return null
		const date = this.convertToDate(dateParam)
		const year = date.getUTCFullYear(),
			month = (date.getUTCMonth() + 1).toString().padStart(2, '0'),
			day = date.getUTCDate().toString().padStart(2, '0')
		return `${year}${separator}${month}${separator}${day}`
	}

	static convertToDate(date: Date | string): Date {
		return date instanceof Date ? date : new Date(date)
	}
}
