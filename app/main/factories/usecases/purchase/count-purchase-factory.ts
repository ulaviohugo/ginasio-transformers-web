import { DbCountPurchase } from '@/data/usecases'
import { PurchasePrismaRepository } from '@/infra/db'

export const makeCountPurchase = () => {
	return new DbCountPurchase(new PurchasePrismaRepository())
}
