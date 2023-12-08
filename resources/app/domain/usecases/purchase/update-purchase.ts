import { StockModel } from '@/domain/models'

export interface UpdatePurchase {
	update(param: StockModel): Promise<StockModel>
}
