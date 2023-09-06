import { Uploader } from '@/data/protocols/services'

export interface DeletePurchase {
	delete(id: number, uploader?: Uploader): Promise<boolean>
}
