import { InsuredModel } from '@/domain/models'

export interface InsuredRepository {
	add(param: InsuredModel): Promise<InsuredModel>
	findByEmail(email: string): Promise<InsuredModel | null>
	findByDocument(
		documentType: string,
		documentNumber: string
	): Promise<InsuredModel | null>
	findById(id: number): Promise<InsuredModel | null>
	loadAll(): Promise<InsuredModel[]>
	update(param: InsuredModel): Promise<InsuredModel>
	delete(id: number): Promise<boolean>
	count(): Promise<number>
}
