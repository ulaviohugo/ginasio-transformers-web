import { LoadCurrentUserController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeLoadCurrentUser } from '../..'

export const makeLoadCurrentUserController = (): Controller => {
	return new LoadCurrentUserController(makeLoadCurrentUser())
}
