import { StockModel } from '@/domain/models'

export interface UpdateStock {
	update(param: StockModel): Promise<StockModel>
}
