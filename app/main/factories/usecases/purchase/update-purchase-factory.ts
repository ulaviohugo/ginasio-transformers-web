import { DbUpdatePurchase } from '@/app/data/usecases'
import { PurchasePrismaRepository } from '@/app/infra/db'

export const makeUpdatePurchase = () => {
	return new DbUpdatePurchase(new PurchasePrismaRepository())
}
