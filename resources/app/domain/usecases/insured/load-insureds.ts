import { InsuredModel } from '@/domain/models'

export interface LoadInsureds {
	load(): Promise<LoadInsuredsResult>
}

export type LoadInsuredsResult = InsuredModel[]
