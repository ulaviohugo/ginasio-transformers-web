import { DbAddPurchase } from '@/data/usecases'
import { PurchasePrismaRepository } from '@/infra/db'

export const makeAddPurchase = () => {
	return new DbAddPurchase(new PurchasePrismaRepository())
}
