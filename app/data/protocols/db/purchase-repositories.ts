import { PurchaseModel } from '@/app/domain/models'

export interface PurchaseRepository {
	add(param: PurchaseModel): Promise<PurchaseModel>
	findById(id: number): Promise<PurchaseModel | null>
	loadAll(): Promise<PurchaseModel[]>
	update(param: PurchaseModel): Promise<PurchaseModel>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
