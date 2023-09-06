import { Crypto } from '@/data/protocols/cryptography'
import { Middleware } from '../protocols'
import { ok, unauthorized } from '../helper'
import { HttpResponse } from '@/data/protocols/http'

export class AuthMiddleware implements Middleware {
	constructor(private readonly decrypter: Crypto) {}

	async handle(request: AuthMiddlewareRequest): Promise<HttpResponse> {
		try {
			const { accessToken } = request
			if (accessToken) {
				const token = await this.decrypter.decrypt(accessToken)
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
	accessToken?: string
}
