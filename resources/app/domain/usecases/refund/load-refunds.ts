import { RefundModel } from '@/domain/models'

export interface LoadRefunds {
	load(): Promise<RefundModel[]>
}
