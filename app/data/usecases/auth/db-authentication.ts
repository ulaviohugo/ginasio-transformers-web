import {
	Authentication,
	AuthenticationParams,
	AuthenticationResult
} from '@/domain/usecases'
import { EmployeeRepository } from '@/data/protocols'
import { ObjectUtils } from '@/utils'
import { Hasher, Crypto } from '@/data/protocols/cryptography'

export class DbAuthentication implements Authentication {
	constructor(
		private readonly employeeRepository: EmployeeRepository,
		private readonly hasher: Hasher,
		private readonly encrypter: Crypto
	) {}
	async auth(param: AuthenticationParams): Promise<AuthenticationResult> {
		const data = ObjectUtils.trimValues(param)

		const employee = await this.employeeRepository.findByEmail(data.email)
		if (!employee) return null as any
		if (!employee.canLogin) return 'canNotLogin'

		const isValid = await this.hasher.compare(param.password, employee.password as any)
		if (!isValid) return 'invalidCredential'

		const accessToken = await this.encrypter.encrypt(employee.id.toString())
		const { id, name, email } = employee

		return {
			accessToken,
			user: { id, name, email }
		}
	}
}
