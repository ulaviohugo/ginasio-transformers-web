import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { DeleteAbsenceJustification } from '@/domain/usecases'
import { RemoteDeleteResource } from '@/data/usecases'

export const makeRemoteDeleteAbsenceJustification = (): DeleteAbsenceJustification => {
	return new RemoteDeleteResource(
		makeApiUrl('/absence-justifications'),
		makeAuthorizeHttpClientDecorator()
	)
}
