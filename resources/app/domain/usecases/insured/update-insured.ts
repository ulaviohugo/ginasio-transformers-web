import { Uploader } from '@/data/protocols/services'
import { InsuredModel } from '@/domain/models'

export interface UpdateInsured {
	update(
		param: InsuredModel,
		uploader?: Uploader
	): Promise<InsuredModel | 'notFound' | 'emailInUse' | 'documentInUse'>
}
