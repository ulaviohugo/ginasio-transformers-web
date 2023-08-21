import { Controller } from '@/app/infra/http/protocols'
import { makeAuthentication } from '../..'
import { AuthenticationController } from '@/app/infra/http/controllers'
import { makeAuthenticationValidation } from './authentication-validation-factory'

export const makeAuthenticationController = (): Controller => {
	return new AuthenticationController(
		makeAuthentication(),
		makeAuthenticationValidation()
	)
}
