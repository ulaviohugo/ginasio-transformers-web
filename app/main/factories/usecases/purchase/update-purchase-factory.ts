import { DbUpdatePurchase } from '@/data/usecases'
import { PurchasePrismaRepository } from '@/infra/db'

export const makeUpdatePurchase = () => {
	return new DbUpdatePurchase(new PurchasePrismaRepository())
}
