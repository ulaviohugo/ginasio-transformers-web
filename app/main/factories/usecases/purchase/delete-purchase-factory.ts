import { DbDeletePurchase } from '@/app/data/usecases'
import { PurchasePrismaRepository } from '@/app/infra/db'

export const makeDeletePurchase = () => {
	return new DbDeletePurchase(new PurchasePrismaRepository())
}
