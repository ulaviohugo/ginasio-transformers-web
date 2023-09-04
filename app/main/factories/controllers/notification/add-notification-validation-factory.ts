import { NotificationModel } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/app/validation/validators'

type FieldTypes = keyof NotificationModel

export const makeAddNotificationValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['notifiable', 'notifiableId', 'text']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
