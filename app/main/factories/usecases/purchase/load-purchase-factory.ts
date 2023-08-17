import { DbLoadPurchase } from '@/app/data/usecases'
import { PurchasePrismaRepository } from '@/app/infra/db'

export const makeLoadPurchase = () => {
	return new DbLoadPurchase(new PurchasePrismaRepository())
}
