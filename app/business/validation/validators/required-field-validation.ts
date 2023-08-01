import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | any {
    const field = input[this.fieldName]?.toString()?.trim()
    if (!field) {
      return new MissingParamError(this.fieldName)
    }
  }
}
