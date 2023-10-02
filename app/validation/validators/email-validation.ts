import { InvalidParamError } from '@/infra/http/errors'
import { Validation } from '@/infra/http/protocols'

export class EmailValidation implements Validation {
	constructor(private readonly fieldName: string) {}

	validate(input: any): Error | any {
		const email = input[this.fieldName]
		if (!email) return

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		const isValid = emailRegex.test(email)
		if (!isValid) {
			return new InvalidParamError(this.fieldName)
		}
	}
}
