import { RemoteLoadSuppliers } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadSuppliers = () => {
	return new RemoteLoadSuppliers(
		makeApiUrl('/suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
