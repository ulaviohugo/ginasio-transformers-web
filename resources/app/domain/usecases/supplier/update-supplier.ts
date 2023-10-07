import { SupplierModel } from '@/domain/models'

export interface UpdateSupplier {
	update(param: SupplierModel): Promise<SupplierModel>
}
