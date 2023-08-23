import { RemoteLoadSuppliers } from '@/app/data/usecases'
import { makeApiUrl } from '../../../http'
import { makeAuthorizeHttpClientDecorator } from '../../../decorators'

export const makeRemoteLoadSuppliers = () => {
	return new RemoteLoadSuppliers(
		makeApiUrl('/suppliers'),
		makeAuthorizeHttpClientDecorator()
	)
}
