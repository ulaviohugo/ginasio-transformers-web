import { Uploader } from '@/app/data/protocols/services'
import { Supplier } from '../../models'

export interface AddSupplier {
	add(param: Supplier, uploader?: Uploader): Promise<AddSuppliersResult>
}

export type AddSuppliersResult = Supplier | 'emailInUse'
