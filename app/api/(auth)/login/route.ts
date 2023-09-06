import { adaptRoute } from '@/main/adapters'
import { makeAuthenticationController } from '@/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAuthenticationController(), request)
}
