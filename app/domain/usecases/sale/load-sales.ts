import { SaleModel } from '@/domain/models'

export interface LoadSales {
	load(): Promise<LoadSalesResult>
}

export type LoadSalesResult = SaleModel[]
