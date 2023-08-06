import { getServerSession } from 'next-auth'
import { authOptions } from '.'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}
