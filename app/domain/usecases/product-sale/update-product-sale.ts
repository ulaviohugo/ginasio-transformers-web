import { SaleModel } from '@/domain/models'

export interface UpdateSale {
	update(param: SaleModel): Promise<SaleModel | 'notFound'>
}
