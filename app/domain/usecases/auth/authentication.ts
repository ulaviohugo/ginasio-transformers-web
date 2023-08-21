import { Account } from '../../models'

export interface Authentication {
	auth(params: AuthenticationParams): Promise<AuthenticationResult>
}

export type AuthenticationParams = {
	email: string
	password: string
}

export type AuthenticationResult = Account | 'canNotLogin' | 'invalidCredential'
