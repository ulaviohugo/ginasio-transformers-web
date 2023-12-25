import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { DeleteAdmission } from '@/domain/usecases'
import { RemoteDeleteResource } from '@/data/usecases'

export const makeRemoteDeleteAdmission = (): DeleteAdmission => {
	return new RemoteDeleteResource(
		makeApiUrl('/admissions'),
		makeAuthorizeHttpClientDecorator()
	)
}
