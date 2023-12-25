import { RemoteLoadResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadAbsenceJustifications } from '@/domain/usecases'

export const makeRemoteLoadAbsenceJustifications = (): LoadAbsenceJustifications => {
	return new RemoteLoadResource(
		makeApiUrl('/absence-justifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
