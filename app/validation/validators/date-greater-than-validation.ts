import { Validation } from '@/app/infra/http/protocols'
import { DateUtils, LabelUtils } from '@/app/utils'

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
				`O parâmetro ${LabelUtils.translateField(this.fieldName1 as any)} 
				tem de ser maior que ${LabelUtils.translateField(this.fieldName2 as any)} `
			)
		}
	}
}
