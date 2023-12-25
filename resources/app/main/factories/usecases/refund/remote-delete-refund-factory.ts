import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { DeleteRefund } from '@/domain/usecases'
import { RemoteDeleteResource } from '@/data/usecases'

export const makeRemoteDeleteRefund = (): DeleteRefund => {
	return new RemoteDeleteResource(
		makeApiUrl('/refunds'),
		makeAuthorizeHttpClientDecorator()
	)
}
