import { RemoteLoadResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadAdmissions } from '@/domain/usecases'

export const makeRemoteLoadAdmissions = (): LoadAdmissions => {
	return new RemoteLoadResource(
		makeApiUrl('/admissions'),
		makeAuthorizeHttpClientDecorator()
	)
}
