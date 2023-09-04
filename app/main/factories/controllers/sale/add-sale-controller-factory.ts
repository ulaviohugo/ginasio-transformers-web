import { Controller } from '@/app/infra/http/protocols'
import { makeAddSaleValidation } from '..'
import { makeAddSale } from '../..'
import { AddSaleController } from '@/app/infra/http/controllers'
import { NotificationPrismaRepository, PurchasePrismaRepository } from '@/app/infra/db'

export const makeAddSaleController = (): Controller => {
	return new AddSaleController(
		makeAddSale(),
		makeAddSaleValidation(),
		new PurchasePrismaRepository(),
		new NotificationPrismaRepository()
	)
}
