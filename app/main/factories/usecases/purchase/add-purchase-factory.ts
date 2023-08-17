import { DbAddPurchase } from '@/app/data/usecases'
import { PurchasePrismaRepository } from '@/app/infra/db'

export const makeAddPurchase = () => {
	return new DbAddPurchase(new PurchasePrismaRepository())
}
