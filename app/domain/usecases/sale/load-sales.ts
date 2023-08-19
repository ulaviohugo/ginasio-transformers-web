import { Sale } from '../../models'

export interface LoadSales {
	load(): Promise<LoadSalesResult>
}

export type LoadSalesResult = Sale[]
