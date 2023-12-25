import { RemoteAddResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { AddRefund } from '@/domain/usecases'

export const makeRemoteAddRefund = (): AddRefund => {
	return new RemoteAddResource(makeApiUrl('/refunds'), makeAuthorizeHttpClientDecorator())
}
