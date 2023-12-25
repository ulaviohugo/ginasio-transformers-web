import { RemoteLoadResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadRefunds } from '@/domain/usecases'

export const makeRemoteLoadRefunds = (): LoadRefunds => {
	return new RemoteLoadResource(
		makeApiUrl('/refunds'),
		makeAuthorizeHttpClientDecorator()
	)
}
