import { Employee } from '@/app/business/domain/models'
import { Validation } from '@/app/business/presentation/protocols'
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/app/business/validation/validators'

type FieldTypes = keyof Employee

export const makeAddEmployeeValidation = () => {
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
  validations.push(new EmailValidation('email'))
  return new ValidationComposite(validations)
}
