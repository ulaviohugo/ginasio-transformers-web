import { Uploader } from '@/app/data/protocols/services'
import { Purchase } from '../../models'

export interface UpdatePurchase {
	update(param: Purchase, uploader?: Uploader): Promise<Purchase | 'notFound'>
}
