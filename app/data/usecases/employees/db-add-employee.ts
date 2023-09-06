import { AddEmployee, AddEmployeesResult } from '@/domain/usecases'
import { EmployeeRepository } from '@/data/protocols'
import { EmployeeModel } from '@/domain/models'
import { ObjectUtils } from '@/utils'
import { Uploader } from '@/data/protocols/services'
import { Hasher } from '@/data/protocols/cryptography'
import { PrismaEmployeeMapper } from '@/infra/db/prisma/mappers'

export class DbAddEmployee implements AddEmployee {
	constructor(
		private readonly employeeRepository: EmployeeRepository,
		private readonly hasher: Hasher
	) {}
	async add(param: EmployeeModel, uploader?: Uploader): Promise<AddEmployeesResult> {
		const data = ObjectUtils.trimValues(param)

		const exists = await this.employeeRepository.findByEmail(data.email)
		if (exists) return 'emailInUse'

		const foundByDoc = await this.employeeRepository.findByDocument(
			data.documentType,
			data.documentNumber
		)
		if (foundByDoc) return 'documentInUse'

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
