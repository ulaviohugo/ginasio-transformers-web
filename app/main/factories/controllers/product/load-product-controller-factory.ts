import { LoadProductController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadProduct } from '../..'

export const makeLoadProductController = (): Controller => {
	return new LoadProductController(makeLoadProduct())
}
