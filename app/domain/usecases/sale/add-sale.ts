import { Sale } from '../../models'

export interface AddSale {
	add(param: Sale): Promise<AddSalesResult>
}

export type AddSalesResult = Sale
