import { Uploader } from '@/data/protocols/services'

export interface DeleteEmployee {
	delete(employee_id: number, uploader?: Uploader): Promise<boolean>
}
