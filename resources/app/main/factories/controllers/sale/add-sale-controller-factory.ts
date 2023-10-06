import { Controller } from '@/infra/http/protocols'
import { makeAddProductSaleValidation, makeAddSaleValidation } from '..'
import { makeAddSale } from '@/main/factories'
import { AddSaleController } from '@/infra/http/controllers'
import { NotificationPrismaRepository, PurchasePrismaRepository } from '@/infra/db'

export const makeAddSaleController = (): Controller => {
	return new AddSaleController(
		makeAddSale(),
		makeAddSaleValidation(),
		makeAddProductSaleValidation(),
		new PurchasePrismaRepository(),
		new NotificationPrismaRepository()
	)
}
