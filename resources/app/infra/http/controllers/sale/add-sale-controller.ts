import { AddSale } from '@/domain/usecases'
import { badRequest, notFound, ok, serverError } from '@/infra/http/helper'
import { Controller, ControllerParams, Validation } from '@/infra/http/protocols'
import { SaleModel, Notifiable, PurchaseModel } from '@/domain/models'
import { NumberUtils } from '@/utils'
import { HttpResponse } from '@/data/protocols/http'
import { dbErrorHandler } from '@/infra/db'
import { NotificationRepository, PurchaseRepository } from '@/data/protocols'

export class AddSaleController implements Controller {
	constructor(
		private readonly addSale: AddSale,
		private readonly validation: Validation,
		private readonly productValidation: Validation,
		private readonly purchaseRepository: PurchaseRepository,
		private readonly notificationRepository: NotificationRepository
	) {}
	async handle(request: ControllerParams<SaleModel>): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(request)
			if (error) {
				return badRequest(error)
			}

			console.log({ data: request.productSales })

			const productIds = request.productSales?.map((item) => item.productId)
			if (productIds.length < 1) {
				return badRequest(new Error('Informe os produtos para a venda'))
			}

			const stockList: PurchaseModel[] = []

			for (let i = 0; i < productIds.length; i++) {
				const product = request.productSales[i]
				const productError = this.productValidation.validate(product)
				if (productError) {
					productError.message = `${productError.message}. ${i + 1}º Produto`
					return badRequest(productError)
				}
				const stock = await this.purchaseRepository.find({
					filter: { productId: NumberUtils.convertToNumber(product.productId) }
				})
				console.log({ stock, id: NumberUtils.convertToNumber(product.productId) })

				if (!stock) return notFound(`O ${i + 1}º produto não foi encontrado no estoque`)
				if (
					NumberUtils.convertToNumber(stock.quantity) <
					NumberUtils.convertToNumber(product.quantity)
				) {
					return badRequest(new Error('Produto não disponível em quantidade suficiente'))
				}
				stockList.push(stock)
			}

			const createdById = NumberUtils.convertToNumber(request.accountId)

			const createdSale = await this.addSale.add({
				...request,
				customerId: request.customerId && NumberUtils.convertToNumber(request.customerId),
				employeeId: NumberUtils.convertToNumber(request.employeeId) || createdById,
				totalValue: NumberUtils.convertToPrice(request.totalValue),
				amountPaid: NumberUtils.convertToPrice(request.amountPaid),
				discount: NumberUtils.convertToPrice(request.discount),
				createdById
			})

			for (let i = 0; i < stockList.length; i++) {
				const stock = stockList[i]
				const stockQuantity = NumberUtils.convertToNumber(stock.quantity)
				const productQuantity = NumberUtils.convertToNumber(
					request.productSales[i].quantity
				)
				const currentStock = stockQuantity - productQuantity

				if (currentStock <= 6) {
					await this.notificationRepository.add({
						notifiable: Notifiable.stock,
						notifiableId: stock.id,
						text: `Produto ${stock.product?.name} está com stock baixo, itens restantes: ${currentStock}`
					} as any)
				}

				await this.purchaseRepository.update({
					...stock,
					quantity: currentStock
				})
			}

			return ok(createdSale)
		} catch (error) {
			return serverError(dbErrorHandler(error))
		}
	}
}
