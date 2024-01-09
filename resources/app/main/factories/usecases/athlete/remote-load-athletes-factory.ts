import { RemoteLoadResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadAthletes } from '@/domain/usecases'

export const makeRemoteLoadAthletes = (): LoadAthletes => {
	return new RemoteLoadResource(
		makeApiUrl('/athletes'),
		makeAuthorizeHttpClientDecorator()
	)
}
