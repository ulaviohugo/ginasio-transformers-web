import { RefundModel } from '@/domain/models'

export interface UpdateRefund {
	update(param: RefundModel): Promise<RefundModel>
}
