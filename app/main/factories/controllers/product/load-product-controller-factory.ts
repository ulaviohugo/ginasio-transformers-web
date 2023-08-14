import { LoadProductController } from '@/app/infra/http/controllers'
import { Controller } from '@/app/infra/http/protocols'
import { makeLoadProduct } from '../..'

export const makeLoadProductController = (): Controller => {
	return new LoadProductController(makeLoadProduct())
}
