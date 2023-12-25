import { RemoteUpdateResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { UpdateAdmission } from '@/domain/usecases'

export const makeRemoteUpdateAdmission = (): UpdateAdmission => {
	return new RemoteUpdateResource(
		makeApiUrl('/admissions'),
		makeAuthorizeHttpClientDecorator()
	)
}
