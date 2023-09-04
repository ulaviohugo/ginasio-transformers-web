import { SaleModel } from '@/app/domain/models'

export interface SaleRepository {
	add(param: SaleModel): Promise<SaleModel>
	findById(id: number): Promise<SaleModel | null>
	loadAll(): Promise<SaleModel[]>
	update(param: SaleModel): Promise<SaleModel>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
