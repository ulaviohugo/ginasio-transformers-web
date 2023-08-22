import { JwtAdapter } from '@/app/infra/cryptography'
import { AuthMiddleware } from '@/app/infra/http/middleware'
import { Middleware } from '@/app/infra/http/protocols'
import { env } from '../../config'

export const makeAuthMiddleware = (): Middleware => {
	return new AuthMiddleware(new JwtAdapter(env.jwtSecret))
}
