export interface Crypto {
	encrypt: (plaintext: string) => Promise<string>
	decrypt: (hashedText: string) => Promise<string>
}
