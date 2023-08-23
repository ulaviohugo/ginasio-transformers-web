import { Account } from '@/app/domain/models'
import { makeLocalStorageAdapter } from '../factories/cache'

export const setCurrentAccountAdapter = (account: Account | null): void => {
	if (!account) {
		makeLocalStorageAdapter().remove('account')
	} else {
		makeLocalStorageAdapter().set('account', JSON.stringify(account))
	}
}

export const getCurrentAccountAdapter = (): Account => {
	const account = makeLocalStorageAdapter().get('account')
	return account ? JSON.parse(account) : null
}
