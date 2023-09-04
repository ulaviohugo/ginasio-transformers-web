import { NotificationModel } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof NotificationModel

export const makeUpdateNotificationValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['notifiable', 'notifiableId', 'text']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new NumberGreaterThanValidation('id', 0))
	return new ValidationComposite(validations)
}
