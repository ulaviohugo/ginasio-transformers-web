import { Validation } from '@/app/infra/http/protocols'
import { NumberValidation } from '.'
import { LabelUtils } from '@/app/utils'

export class NumberGreaterThanValidation implements Validation {
	constructor(
		private readonly fieldName: string,
		private readonly valueToCompare: number
	) {}

	validate(input: any): Error | any {
		const error = new NumberValidation(this.fieldName).validate(input)
		if (error) return error

		const numberValue = Number(input[this.fieldName])
		if (numberValue <= this.valueToCompare) {
			return new Error(
				`O parâmetro ${LabelUtils.translateField(
					this.fieldName as any
				)} tem de ser maior que ${this.valueToCompare}`
			)
		}
	}
}
