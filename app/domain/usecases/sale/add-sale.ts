import { SaleModel } from '../../models'

export interface AddSale {
	add(param: SaleModel): Promise<AddSalesResult>
}

export type AddSalesResult = SaleModel
