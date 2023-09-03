import { Uploader } from '@/app/data/protocols/services'

export interface DeleteEmployee {
	delete(employeeId: number, uploader?: Uploader): Promise<boolean>
}
