import { Uploader } from '@/app/data/protocols/services'
import { Supplier } from '../../models'

export interface UpdateSupplier {
	update(
		param: Supplier,
		uploader?: Uploader
	): Promise<Supplier | 'notFound' | 'emailInUse'>
}
