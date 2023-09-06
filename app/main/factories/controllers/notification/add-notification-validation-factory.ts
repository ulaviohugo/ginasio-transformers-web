import { NotificationModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

type FieldTypes = keyof NotificationModel

export const makeAddNotificationValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['notifiable', 'notifiableId', 'text']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
