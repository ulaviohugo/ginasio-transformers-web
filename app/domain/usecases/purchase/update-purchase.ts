import { Uploader } from '@/app/data/protocols/services'
import { PurchaseModel } from '../../models'

export interface UpdatePurchase {
	update(param: PurchaseModel, uploader?: Uploader): Promise<PurchaseModel | 'notFound'>
}
