import { Crypto } from '@/app/data/protocols/cryptography'
import { Middleware } from '../protocols'
import { ok, unauthorized } from '../helper'
import { HttpResponse } from '@/app/data/protocols/http'

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
			return unauthorized(error.message)
		}
	}
}

export type AuthMiddlewareRequest = {
	accessToken?: string
}
