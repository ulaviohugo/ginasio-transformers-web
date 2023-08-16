import { Uploader } from '@/app/data/protocols/services'

export interface DeleteProduct {
	delete(productId: number, uploader?: Uploader): Promise<boolean>
}
