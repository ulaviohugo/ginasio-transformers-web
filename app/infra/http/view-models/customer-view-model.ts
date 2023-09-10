import { CustomerModel } from '@/domain/models'

export class CustomerViewModel {
	static toHTTP(employee: CustomerModel) {
		const photo = employee.photo && `/api${employee.photo}`
		return { ...employee, photo } as CustomerModel
	}
}
