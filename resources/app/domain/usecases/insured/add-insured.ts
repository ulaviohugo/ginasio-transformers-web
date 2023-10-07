import { InsuredModel } from '@/domain/models'

export interface AddInsured {
	add(param: InsuredModel): Promise<AddInsuredsResult>
}

export type AddInsuredsResult = InsuredModel
