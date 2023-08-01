import { Employee } from '@/app/business/domain/models'
import { Validation } from '@/app/business/presentation/protocols'
import {
  EmailValidation,
  GreaterThanValidation,
  NumberValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/app/business/validation/validators'

type FieldTypes = keyof Employee

export const makeUpdateEmployeeValidation = () => {
  const validations: Validation[] = []
  const fields: FieldTypes[] = [
    'name',
    'gender',
    'dateOfBirth',
    'hireDate',
    'maritalStatus',
    'educationDegree',
    'phone1',
    'phone2',
    'email',
    'residentialAddress',
    'documentType',
    'documentNumber',
    'nif',
    'dependents',
    'socialSecurity',
    'position',
    'baseSalary',
    'iban',
    'accountNumber',
  ]
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new GreaterThanValidation('id', 0),
    new EmailValidation('email'),
    new NumberValidation('dependents')
  )
  return new ValidationComposite(validations)
}
