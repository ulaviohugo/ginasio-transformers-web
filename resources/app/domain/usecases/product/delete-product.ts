import { Uploader } from '@/data/protocols/services'

export interface DeleteProduct {
	delete(product_id: number, uploader?: Uploader): Promise<boolean>
}
