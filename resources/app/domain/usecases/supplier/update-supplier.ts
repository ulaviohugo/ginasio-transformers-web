import { Uploader } from '@/data/protocols/services'
import { SupplierModel } from '@/domain/models'

export interface UpdateSupplier {
	update(
		param: SupplierModel,
		uploader?: Uploader
	): Promise<SupplierModel | 'notFound' | 'emailInUse'>
}
