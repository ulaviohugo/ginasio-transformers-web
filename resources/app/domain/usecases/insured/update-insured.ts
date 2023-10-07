import { InsuredModel } from '@/domain/models'

export interface UpdateInsured {
	update(param: InsuredModel): Promise<InsuredModel>
}
