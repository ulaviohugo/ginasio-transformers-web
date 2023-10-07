import { Uploader } from '@/data/protocols/services'

export interface DeleteCustomer {
	delete(employee_id: number, uploader?: Uploader): Promise<boolean>
}
