import { Uploader } from '@/data/protocols/services'

export interface DeleteSupplier {
	delete(employee_id: number, uploader?: Uploader): Promise<boolean>
}
