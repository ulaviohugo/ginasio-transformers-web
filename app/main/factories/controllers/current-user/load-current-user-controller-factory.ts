import { LoadCurrentUserController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadCurrentUser } from '../..'

export const makeLoadCurrentUserController = (): Controller => {
	return new LoadCurrentUserController(makeLoadCurrentUser())
}
