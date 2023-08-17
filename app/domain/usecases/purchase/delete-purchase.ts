import { Uploader } from '@/app/data/protocols/services'

export interface DeletePurchase {
	delete(id: number, uploader?: Uploader): Promise<boolean>
}
