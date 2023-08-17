import { Purchase } from '@/app/domain/models'

export interface PurchaseRepository {
	add(param: Purchase): Promise<Purchase>
	findByEmail(email: string): Promise<Purchase | null>
	findById(id: number): Promise<Purchase | null>
	loadAll(): Promise<Purchase[]>
	update(param: Purchase): Promise<Purchase>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
