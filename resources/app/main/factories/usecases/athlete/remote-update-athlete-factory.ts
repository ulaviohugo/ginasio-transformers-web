import { RemoteUpdateResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { UpdateAthlete } from '@/domain/usecases'

export const makeRemoteUpdateAthlete = (): UpdateAthlete => {
	return new RemoteUpdateResource(
		makeApiUrl('/athletes'),
		makeAuthorizeHttpClientDecorator()
	)
}
