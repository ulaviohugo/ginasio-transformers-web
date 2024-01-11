import { Validation } from '@/infra/http/protocols'

export class NumberValidation implements Validation {
	constructor(private readonly fieldName: string) {}

	validate(input: any): Error | any {
		const numberRegex = /^[0-9.]{1,50}$/
		const isValid = numberRegex.test(input[this.fieldName])
		if (!isValid) {
			return new Error(`O parâmetro ${this.fieldName} tem de ter formato numérico`)
		}
	}
}
