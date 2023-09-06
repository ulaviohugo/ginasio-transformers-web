import { DbDeletePurchase } from '@/data/usecases'
import { PurchasePrismaRepository } from '@/infra/db'

export const makeDeletePurchase = () => {
	return new DbDeletePurchase(new PurchasePrismaRepository())
}
