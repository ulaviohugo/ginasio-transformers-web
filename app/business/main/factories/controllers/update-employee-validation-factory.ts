import { Employee } from '@/app/business/domain/models'
import { Validation } from '@/app/business/presentation/protocols'
import {
  EmailValidation,
  GreaterThanValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/app/business/validation/validators'

type FieldTypes = keyof Employee

export const makeUpdateEmployeeValidation = () => {
  const validations: Validation[] = []
  const fields: FieldTypes[] = [
    'name',
    'gender',
    'email',
    'dateOfBirth',
    'hireDate',
    'maritalStatus',
    'educationDegree',
    'phone1',
    'email',
    'residentialAddress',
    'documentType',
    'documentNumber',
    'nif',
    'dependents',
  ]
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new EmailValidation('email'),
    new GreaterThanValidation('id', 0)
  )
  return new ValidationComposite(validations)
}
