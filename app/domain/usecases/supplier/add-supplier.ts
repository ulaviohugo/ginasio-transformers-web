import { Uploader } from '@/data/protocols/services'
import { SupplierModel } from '../../models'

export interface AddSupplier {
	add(param: SupplierModel, uploader?: Uploader): Promise<AddSuppliersResult>
}

export type AddSuppliersResult = SupplierModel | 'emailInUse'
