import { Controller } from '@/infra/http/protocols'
import { makeAddSaleValidation } from '..'
import { makeAddSale } from '@/main/factories'
import { AddSaleController } from '@/infra/http/controllers'
import { NotificationPrismaRepository, PurchasePrismaRepository } from '@/infra/db'

export const makeAddSaleController = (): Controller => {
	return new AddSaleController(
		makeAddSale(),
		makeAddSaleValidation(),
		new PurchasePrismaRepository(),
		new NotificationPrismaRepository()
	)
}
