import bcrypt from 'bcrypt'
import { prismaService as prisma } from '@/app/infra/db'

export async function POST(request: Request) {
	const hashedPassword = await bcrypt.hash('123456', 10)
	const samuel = await prisma.user.upsert({
		where: { email: 'samuelfreitas.ao@gmail.com' },
		update: {},
		create: {
			email: 'samuelfreitas.ao@gmail.com',
			name: 'Samuel Freitas',
			password: hashedPassword
		}
	})
	return new Response('Ok')
}
