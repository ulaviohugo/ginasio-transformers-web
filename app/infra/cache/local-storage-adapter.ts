import { IStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements IStorage {
	set(key: string, value: string): void {
		localStorage.setItem(key, value)
	}

	get(key: string): string {
		return localStorage.getItem(key) as string
	}

	remove(key: string): void {
		localStorage.removeItem(key)
	}
}
