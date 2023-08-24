import { Uploader } from '@/app/data/protocols/services'

export interface DeleteSupplier {
	delete(employeeId: number, uploader?: Uploader): Promise<boolean>
}
