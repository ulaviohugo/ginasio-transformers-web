import { InvalidParamError } from '@/app/infra/http/errors'
import { Validation } from '@/app/infra/http/protocols'

export class EmailValidation implements Validation {
	constructor(private readonly fieldName: string) {}

	validate(input: any): Error | any {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		const isValid = emailRegex.test(input[this.fieldName])
		if (!isValid) {
			return new InvalidParamError(this.fieldName)
		}
	}
}
