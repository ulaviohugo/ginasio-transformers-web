import { Purchase } from '../../models'

export interface LoadPurchases {
	load(): Promise<LoadPurchasesResult>
}

export type LoadPurchasesResult = Purchase[]
