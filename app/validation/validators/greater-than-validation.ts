import { Validation } from '@/app/infra/http/protocols'
import { NumberValidation } from '.'

export class GreaterThanValidation implements Validation {
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
        `O parâmetro ${this.fieldName} tem de ser maior que ${this.valueToCompare}`
      )
    }
  }
}
