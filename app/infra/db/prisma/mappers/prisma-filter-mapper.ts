import { NumberUtils } from '@/utils'

const regExDate = /^\d{4}-\d{2}-\d{2}$/
const regexNumber = /^[0-9.]{1,50}$/

export class PrismaFilterMapper {
	static toWhere(data: any) {
		if (!data) return
		return Object.keys(data).reduce((prev, current) => {
			let currentValue = data[current]

			if (regexNumber.test(currentValue)) {
				currentValue = NumberUtils.convertToNumber(currentValue)
			} else if (regExDate.test(currentValue)) {
				const gtDate = this.handleDateTime(currentValue)
				const ltDate = this.handleDateTime(currentValue, 23, 59, 59)
				currentValue = { gte: gtDate, lte: ltDate }
			}

			return { ...prev, [current]: currentValue }
		}, {})
	}

	private static handleDateTime(date: string, hour = 0, minute = 0, second = 0) {
		const dateTime = new Date(date)
		dateTime.setHours(hour)
		dateTime.setMinutes(minute)
		dateTime.setSeconds(second)
		return dateTime
	}
}
