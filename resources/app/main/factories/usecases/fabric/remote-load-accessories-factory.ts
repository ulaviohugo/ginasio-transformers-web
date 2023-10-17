import { RemoteLoadFabrics } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadFabrics = () => {
	return new RemoteLoadFabrics(makeApiUrl('/fabrics'), makeAuthorizeHttpClientDecorator())
}
