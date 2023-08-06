import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { prismaService } from '../infra/db'

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
          type: 'password',
        },
      },
      async authorize(credentials, req): Promise<any> {
        console.log(credentials)

        const user = credentials
        return user
      },
    }),
  ],
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV == 'development',
  session: { strategy: 'jwt' },
}
