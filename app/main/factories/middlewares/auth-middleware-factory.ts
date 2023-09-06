import { JwtAdapter } from '@/infra/cryptography'
import { AuthMiddleware } from '@/infra/http/middleware'
import { Middleware } from '@/infra/http/protocols'
import { env } from '../../config'

export const makeAuthMiddleware = (): Middleware => {
	return new AuthMiddleware(new JwtAdapter(env.jwtSecret))
}
