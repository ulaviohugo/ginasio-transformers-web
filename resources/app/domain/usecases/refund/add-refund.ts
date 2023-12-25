import { RefundModel } from '@/domain/models'

export interface AddRefund {
	add(params: RefundModel): Promise<RefundModel>
}
