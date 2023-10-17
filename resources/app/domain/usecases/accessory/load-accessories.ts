import { AccessoryModel } from '@/domain/models'

export interface LoadAccessories {
	load(): Promise<AccessoryModel[]>
}
