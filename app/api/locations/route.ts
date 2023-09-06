import { HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { prismaService } from '@/infra/db'
import { adaptResponse } from '@/main/adapters'

export async function GET() {
	let response: HttpResponse
	try {
		const countries = await prismaService.country.findMany({ orderBy: { name: 'asc' } })
		const provinces = await prismaService.province.findMany({ orderBy: { name: 'asc' } })
		const municipalities = await prismaService.municipality.findMany({
			orderBy: { name: 'asc' }
		})
		response = {
			statusCode: HttpStatusCode.ok,
			body: { countries, provinces, municipalities }
		}
	} catch (error: any) {
		response = { statusCode: HttpStatusCode.serverError, body: error.message }
	}
	return adaptResponse(response)
}
