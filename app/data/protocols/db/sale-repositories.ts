import { Sale } from '@/app/domain/models'

export interface SaleRepository {
	add(param: Sale): Promise<Sale>
	findById(id: number): Promise<Sale | null>
	loadAll(): Promise<Sale[]>
	update(param: Sale): Promise<Sale>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
