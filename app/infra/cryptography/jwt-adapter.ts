import jwt from 'jsonwebtoken'
import { Crypto } from '@/app/data/protocols/cryptography'

export class JwtAdapter implements Crypto {
	constructor(private readonly secret: string) {}

	async encrypt(plaintext: string): Promise<string> {
		return jwt.sign({ id: plaintext }, this.secret)
	}

	async decrypt<T = any>(ciphertext: string): Promise<T> {
		return jwt.verify(ciphertext, this.secret) as any
	}
}
