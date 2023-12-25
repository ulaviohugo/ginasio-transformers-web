import { RemoteUpdateResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { UpdateAbsenceJustification } from '@/domain/usecases'

export const makeRemoteUpdateAbsenceJustification = (): UpdateAbsenceJustification => {
	return new RemoteUpdateResource(
		makeApiUrl('/absence-justifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
