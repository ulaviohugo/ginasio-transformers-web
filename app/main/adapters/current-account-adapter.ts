import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '../factories/cache'

export const setCurrentAccountAdapter = (account: AccountModel | null): void => {
	if (!account) {
		makeLocalStorageAdapter().remove('account')
	} else {
		makeLocalStorageAdapter().set('account', JSON.stringify(account))
	}
}

export const getCurrentAccountAdapter = (): AccountModel => {
	const account = makeLocalStorageAdapter().get('account')
	return account ? JSON.parse(account) : null
}
