import { RemoteAddResource } from '@/data/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { AddAbsenceJustification } from '@/domain/usecases'

export const makeRemoteAddAbsenceJustification = (): AddAbsenceJustification => {
	return new RemoteAddResource(
		makeApiUrl('/absence-justifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
