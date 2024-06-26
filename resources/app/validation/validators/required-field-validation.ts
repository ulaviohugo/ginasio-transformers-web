import { MissingParamError } from '@/infra/http/errors'
import { Validation } from '@/infra/http/protocols'

export class RequiredFieldValidation implements Validation {
	constructor(private readonly fieldName: string) {}

	validate(input: any): Error | any {
		const field = input[this.fieldName]?.toString()?.trim()
		if (!field) {
			return new MissingParamError(this.fieldName)
		}
	}
}
