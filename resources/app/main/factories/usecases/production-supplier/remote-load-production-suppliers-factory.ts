import { RemoteLoadSuppliers } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadProductionSuppliers = () => {
	return new RemoteLoadSuppliers(
		makeApiUrl('/production-suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
