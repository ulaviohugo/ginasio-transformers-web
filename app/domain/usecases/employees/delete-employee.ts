import { Uploader } from '@/data/protocols/services'

export interface DeleteEmployee {
	delete(employeeId: number, uploader?: Uploader): Promise<boolean>
}
