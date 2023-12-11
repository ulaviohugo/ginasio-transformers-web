import { ProductionSaleModel } from '@/domain/models'

export interface UpdateProductionSale {
	update(param: ProductionSaleModel): Promise<ProductionSaleModel>
}
