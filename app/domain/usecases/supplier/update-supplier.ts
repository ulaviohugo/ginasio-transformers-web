import { Uploader } from '@/data/protocols/services'
import { SupplierModel } from '../../models'

export interface UpdateSupplier {
	update(
		param: SupplierModel,
		uploader?: Uploader
	): Promise<SupplierModel | 'notFound' | 'emailInUse'>
}
