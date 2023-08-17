import { DbCountPurchase } from '@/app/data/usecases'
import { PurchasePrismaRepository } from '@/app/infra/db'

export const makeCountPurchase = () => {
	return new DbCountPurchase(new PurchasePrismaRepository())
}
