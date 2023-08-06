import { InvalidParamError } from '@/app/infra/http/errors'
import { Validation } from '@/app/infra/http/protocols'

export class CompareFieldsValidation implements Validation {
	constructor(
		private readonly fieldName: string,
		private readonly fieldToCompareName: string
	) {}

	validate(input: any): Error | any {
		if (input[this.fieldName] !== input[this.fieldToCompareName]) {
			return new InvalidParamError(this.fieldToCompareName)
		}
	}
}
