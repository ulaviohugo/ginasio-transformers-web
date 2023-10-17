import { FabricModel } from '@/domain/models'

export interface LoadFabrics {
	load(): Promise<FabricModel[]>
}
