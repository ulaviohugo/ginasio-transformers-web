import { AddEmployee, AddEmployeesResult } from '@/app/domain/usecases'
import { EmployeeRepository } from '../../protocols'
import { Employee } from '../../../domain/models'
import { ObjectUtils } from '@/app/utils'
import { Uploader } from '../../protocols/services'
import { Hasher } from '../../protocols/cryptography'
import { PrismaEmployeeMapper } from '@/app/infra/db/prisma/mappers'

export class DbAddEmployee implements AddEmployee {
	constructor(
		private readonly employeeRepository: EmployeeRepository,
		private readonly hasher: Hasher
	) {}
	async add(param: Employee, uploader?: Uploader): Promise<AddEmployeesResult> {
		const data = ObjectUtils.trimValues(param)

		const exists = await this.employeeRepository.findByEmail(data.email)
		if (exists && exists.id !== data.id) return 'emailInUse'

		const foundByDoc = await this.employeeRepository.findByDocument(
			data.documentType,
			data.documentNumber
		)
		if (foundByDoc && foundByDoc.id !== data.id) return 'documentInUse'

		let image
		if (uploader) {
			image = await uploader.upload()
		}

		let hashedPassword: any
		if (data.password) {
			hashedPassword = await this.hasher.hash(data.password)
		}
		const createdEmployee = await this.employeeRepository.add({
			...data,
			photo: image,
			password: hashedPassword
		})

		return PrismaEmployeeMapper.toDomain(createdEmployee as any)
	}
}
