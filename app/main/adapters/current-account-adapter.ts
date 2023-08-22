import { Account } from '@/app/domain/models'
import { makeLocalStorageAdapter } from '../factories/cache'

export const setCurrentAccountAdapter = (account: Account): void => {
	makeLocalStorageAdapter().set('account', JSON.stringify(account))
}

export const getCurrentAccountAdapter = (): Account => {
	const account = makeLocalStorageAdapter().get('account')
	return account ? JSON.parse(account) : null
}
