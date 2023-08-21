import { DbAuthentication } from '@/app/data/usecases'
import { BcryptAdapter, JwtAdapter } from '@/app/infra/cryptography'
import { EmployeePrismaRepository } from '@/app/infra/db'
import { env } from '@/app/main/config'

export const makeAuthentication = () => {
	return new DbAuthentication(
		new EmployeePrismaRepository(),
		new BcryptAdapter(),
		new JwtAdapter(env.jwtSecret)
	)
}
