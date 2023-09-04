import { SaleModel } from '../../models'

export interface UpdateSale {
	update(param: SaleModel): Promise<SaleModel | 'notFound'>
}
