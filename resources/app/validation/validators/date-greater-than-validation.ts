import { Validation } from '@/infra/http/protocols'
import { DateUtils } from '@/utils'

export class DateGreaterThanValidation implements Validation {
	constructor(
		private readonly fieldName1: string,
		private readonly fieldName2: string
	) {}

	validate(input: any): Error | any {
		const date1: Date = DateUtils.convertToDate(input[this.fieldName1])
		const date2: Date = DateUtils.convertToDate(input[this.fieldName2])

		if (!date1 || !date2) return

		if (date1 <= date2) {
			return new Error(
				`O parâmetro ${this.fieldName1} 
				tem de ser maior que ${this.fieldName2} `
			)
		}
	}
}
