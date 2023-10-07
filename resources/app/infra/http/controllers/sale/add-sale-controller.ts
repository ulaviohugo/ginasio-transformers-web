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

			console.log({ data: request.product_sales })

			const product_ids = request.product_sales?.map((item) => item.product_id)
			if (product_ids.length < 1) {
				return badRequest(new Error('Informe os produtos para a venda'))
			}

			const stockList: PurchaseModel[] = []

			for (let i = 0; i < product_ids.length; i++) {
				const product = request.product_sales[i]
				const productError = this.productValidation.validate(product)
				if (productError) {
					productError.message = `${productError.message}. ${i + 1}º Produto`
					return badRequest(productError)
				}
				const stock = await this.purchaseRepository.find({
					filter: { product_id: NumberUtils.convertToNumber(product.product_id) }
				})
				console.log({ stock, id: NumberUtils.convertToNumber(product.product_id) })

				if (!stock) return notFound(`O ${i + 1}º produto não foi encontrado no estoque`)
				if (
					NumberUtils.convertToNumber(stock.quantity) <
					NumberUtils.convertToNumber(product.quantity)
				) {
					return badRequest(new Error('Produto não disponível em quantidade suficiente'))
				}
				stockList.push(stock)
			}

			const user_id = NumberUtils.convertToNumber(request.accountId)

			const createdSale = await this.addSale.add({
				...request,
				customer_id:
					request.customer_id && NumberUtils.convertToNumber(request.customer_id),
				employee_id: NumberUtils.convertToNumber(request.employee_id) || user_id,
				total_value: NumberUtils.convertToPrice(request.total_value),
				amount_paid: NumberUtils.convertToPrice(request.amount_paid),
				discount: NumberUtils.convertToPrice(request.discount),
				user_id
			})

			for (let i = 0; i < stockList.length; i++) {
				const stock = stockList[i]
				const stockQuantity = NumberUtils.convertToNumber(stock.quantity)
				const productQuantity = NumberUtils.convertToNumber(
					request.product_sales[i].quantity
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
