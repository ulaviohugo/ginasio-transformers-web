import { SaleModel } from '@/domain/models'
import { QueryParams } from '.'

export interface SaleRepository {
	add(param: SaleModel): Promise<SaleModel>
	findById(id: number): Promise<SaleModel | null>
	find(queryParams: QueryParams<SaleModel>): Promise<SaleModel | null>
	loadAll(queryParams?: QueryParams<SaleModel>): Promise<SaleModel[]>
	update(param: SaleModel): Promise<SaleModel>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
