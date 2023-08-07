import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import { prismaService } from '../infra/db'
import { NotFoundError } from '../infra/http/errors'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prismaService as any) as any,
	providers: [
		CredentialProvider({
			name: 'credentials',
			credentials: {
				name: { label: 'Name', placeholder: 'Nome', type: 'text' },
				email: { label: 'Email', placeholder: 'Email', type: 'text' },
				password: {
					label: 'Password',
					placeholder: 'Password',
					type: 'password'
				}
			},
			async authorize(credentials, req): Promise<any> {
				const { email = '', password = '' } = credentials as any
				console.log({ email, password })

				if (!email.trim() || !password?.trim()) throw new Error('Informa as credenciais')

				const user = await prismaService.user.findUnique({ where: { email } })

				console.log('user', user)

				if (!user || !user.password) throw new NotFoundError()

				const matchedPassword = await bcrypt.compare(password, user.password)

				if (!matchedPassword) throw new Error('Credenciais inválidas')
				console.log('user', user)

				return user
			}
		})
	],
	secret: process.env.SECRET,
	debug: process.env.NODE_ENV == 'development',
	session: { strategy: 'jwt' }
}
