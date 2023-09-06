import { Controller } from '@/infra/http/protocols'
import { makeAuthentication } from '@/main/factories'
import { AuthenticationController } from '@/infra/http/controllers'
import { makeAuthenticationValidation } from './authentication-validation-factory'

export const makeAuthenticationController = (): Controller => {
	return new AuthenticationController(
		makeAuthentication(),
		makeAuthenticationValidation()
	)
}
