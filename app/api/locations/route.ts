import { HttpResponse, HttpStatusCode } from '@/app/data/protocols/http'
import { prismaService } from '@/app/infra/db'
import { adaptResponse } from '@/app/main/adapters'

export async function GET() {
	let response: HttpResponse
	try {
		const locations = await prismaService.country.findMany({
			include: { provinces: { include: { municipalities: true } } }
		})
		response = { statusCode: HttpStatusCode.ok, body: locations }
	} catch (error: any) {
		response = { statusCode: HttpStatusCode.serverError, body: error.message }
	}
	return adaptResponse(response)
}
