import { LoadInsuredsController } from '@/infra/http/controllers'
import { Controller } from '@/infra/http/protocols'
import { makeLoadInsureds } from '@/main/factories'

export const makeLoadInsuredsController = (): Controller => {
	return new LoadInsuredsController(makeLoadInsureds())
}
