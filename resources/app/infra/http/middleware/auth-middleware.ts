import { Crypto } from '@/data/protocols/cryptography'
import { Middleware } from '@/infra/http/protocols'
import { ok, unauthorized } from '@/infra/http/helper'
import { HttpResponse } from '@/data/protocols/http'

export class AuthMiddleware implements Middleware {
	constructor(private readonly decrypter: Crypto) {}

	async handle(request: AuthMiddlewareRequest): Promise<HttpResponse> {
		try {
			const { access_token } = request
			if (access_token) {
				const token = await this.decrypter.decrypt(access_token)
				return ok({ accountId: token.id })
			}
			return unauthorized('Informe o token')
		} catch (error: any) {
			let message
			switch (error.name) {
				case 'JsonWebTokenError':
					message = 'Token inválido'
					break
				default:
					message = error.message
					break
			}

			return unauthorized(message)
		}
	}
}

export type AuthMiddlewareRequest = {
	access_token?: string
}
