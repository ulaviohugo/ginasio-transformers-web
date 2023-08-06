import { Validation } from '@/app/infra/http/protocols'

export class ValidationComposite implements Validation {
	constructor(private readonly validations: Validation[]) {}

	validate(input: any): Error | any {
		for (const validation of this.validations) {
			const error = validation.validate(input)
			if (error) {
				return error
			}
		}
	}
}
