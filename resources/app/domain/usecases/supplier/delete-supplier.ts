import { Uploader } from '@/data/protocols/services'

export interface DeleteSupplier {
	delete(employeeId: number, uploader?: Uploader): Promise<boolean>
}
