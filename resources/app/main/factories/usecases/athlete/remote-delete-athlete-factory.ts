import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { DeleteAthlete } from '@/domain/usecases'
import { RemoteDeleteResource } from '@/data/usecases'

export const makeRemoteDeleteAthlete = (): DeleteAthlete => {
	return new RemoteDeleteResource(
		makeApiUrl('/athletes'),
		makeAuthorizeHttpClientDecorator()
	)
}
