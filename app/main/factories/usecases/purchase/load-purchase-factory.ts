import { DbLoadPurchase } from '@/data/usecases'
import { PurchasePrismaRepository } from '@/infra/db'

export const makeLoadPurchase = () => {
	return new DbLoadPurchase(new PurchasePrismaRepository())
}
