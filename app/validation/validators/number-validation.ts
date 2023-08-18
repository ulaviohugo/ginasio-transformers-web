import { Validation } from '@/app/infra/http/protocols'
import { LabelUtils } from '@/app/utils'

export class NumberValidation implements Validation {
	constructor(private readonly fieldName: string) {}

	validate(input: any): Error | any {
		const numberRegex = /^[0-9.]{1,50}$/
		const isValid = numberRegex.test(input[this.fieldName])
		if (!isValid) {
			return new Error(
				`O parâmetro ${LabelUtils.translateField(
					this.fieldName as any
				)} tem de ter formato numérico`
			)
		}
	}
}
