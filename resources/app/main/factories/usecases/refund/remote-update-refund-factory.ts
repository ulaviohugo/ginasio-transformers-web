import { RemoteUpdateResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { UpdateRefund } from '@/domain/usecases'

export const makeRemoteUpdateRefund = (): UpdateRefund => {
	return new RemoteUpdateResource(
		makeApiUrl('/refunds'),
		makeAuthorizeHttpClientDecorator()
	)
}
