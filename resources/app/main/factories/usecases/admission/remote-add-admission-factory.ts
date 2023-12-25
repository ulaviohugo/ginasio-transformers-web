import { RemoteAddResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { AddAdmission } from '@/domain/usecases'

export const makeRemoteAddAdmission = (): AddAdmission => {
	return new RemoteAddResource(
		makeApiUrl('/admissions'),
		makeAuthorizeHttpClientDecorator()
	)
}
