import { SaleModel } from '../../models'

export interface LoadSales {
	load(): Promise<LoadSalesResult>
}

export type LoadSalesResult = SaleModel[]
