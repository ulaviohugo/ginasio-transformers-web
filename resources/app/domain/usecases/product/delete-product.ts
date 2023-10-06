import { Uploader } from '@/data/protocols/services'

export interface DeleteProduct {
	delete(productId: number, uploader?: Uploader): Promise<boolean>
}
