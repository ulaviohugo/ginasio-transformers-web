import { HttpResponse, HttpStatusCode } from '@/app/data/protocols/http'
import { prismaService } from '@/app/infra/db'
import { adaptResponse } from '@/app/main/adapters'

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

		/* const locations = await prismaService.country.findMany({
			include: { provinces: { include: { municipalities: true } } }
		})
		response = {
			statusCode: HttpStatusCode.ok,
			body: { locations }
		} */
	} catch (error: any) {
		response = { statusCode: HttpStatusCode.serverError, body: error.message }
	}
	return adaptResponse(response)
}
