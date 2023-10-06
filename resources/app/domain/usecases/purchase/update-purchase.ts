import { Uploader } from '@/data/protocols/services'
import { PurchaseModel } from '@/domain/models'

export interface UpdatePurchase {
	update(param: PurchaseModel, uploader?: Uploader): Promise<PurchaseModel | 'notFound'>
}
