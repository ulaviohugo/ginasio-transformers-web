import { RemoteAddResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { AddAthlete } from '@/domain/usecases'

export const makeRemoteAddAthlete = (): AddAthlete => {
	return new RemoteAddResource(
		makeApiUrl('/athletes'),
		makeAuthorizeHttpClientDecorator()
	)
}
