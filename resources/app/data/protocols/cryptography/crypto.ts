export interface Crypto {
	encrypt: (plaintext: string) => Promise<string>
	decrypt: <T = any>(hashedText: string) => Promise<T>
}
