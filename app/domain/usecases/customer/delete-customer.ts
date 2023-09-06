import { Uploader } from '@/data/protocols/services'

export interface DeleteCustomer {
	delete(employeeId: number, uploader?: Uploader): Promise<boolean>
}
