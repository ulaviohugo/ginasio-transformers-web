import { PurchaseModel } from '@/domain/models'
import { QueryParams } from '.'

export interface PurchaseRepository {
	add(param: PurchaseModel): Promise<PurchaseModel>
	findById(id: number): Promise<PurchaseModel | null>
	findLowStock(): Promise<PurchaseModel[]>
	loadAll(queryParams?: QueryParams<PurchaseModel>): Promise<PurchaseModel[]>
	update(param: PurchaseModel): Promise<PurchaseModel>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
