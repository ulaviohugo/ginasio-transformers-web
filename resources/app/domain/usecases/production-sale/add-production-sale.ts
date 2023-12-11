import { ProductionSaleModel } from '@/domain/models'

export interface AddProductionSale {
	add(param: ProductionSaleModel): Promise<AddProductionSalesResult>
}

export type AddProductionSalesResult = ProductionSaleModel
