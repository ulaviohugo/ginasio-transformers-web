import { Uploader } from '@/app/data/protocols/services'

export interface DeleteCustomer {
	delete(employeeId: number, uploader?: Uploader): Promise<boolean>
}
