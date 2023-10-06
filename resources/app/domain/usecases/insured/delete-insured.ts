import { Uploader } from '@/data/protocols/services'

export interface DeleteInsured {
	delete(id: number, uploader?: Uploader): Promise<boolean>
}
