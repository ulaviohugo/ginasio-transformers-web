import { IStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements IStorage {
	set(key: string, value: string): void {
		sessionStorage.setItem(key, value)
	}

	get(key: string): string {
		return sessionStorage.getItem(key) as string
	}

	remove(key: string): void {
		sessionStorage.removeItem(key)
	}
}
