import { adaptRoute } from '@/app/main/adapters'
import { makeAuthenticationController } from '@/app/main/factories'

export async function POST(request: Request) {
	return adaptRoute(makeAuthenticationController(), request)
}
