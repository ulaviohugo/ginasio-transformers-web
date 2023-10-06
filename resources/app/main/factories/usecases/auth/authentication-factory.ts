import { DbAuthentication } from '@/data/usecases'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { EmployeePrismaRepository } from '@/infra/db'
import { env } from '@/main/config'

export const makeAuthentication = () => {
	return new DbAuthentication(
		new EmployeePrismaRepository(),
		new BcryptAdapter(),
		new JwtAdapter(env.jwtSecret)
	)
}
