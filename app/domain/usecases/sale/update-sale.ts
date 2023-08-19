import { Sale } from '../../models'

export interface UpdateSale {
	update(param: Sale): Promise<Sale | 'notFound'>
}
