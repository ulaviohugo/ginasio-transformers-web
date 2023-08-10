import { prismaService } from '@/app/infra/db'
import { LocationUtils } from '@/app/utils'

async function Seed() {
	const country = LocationUtils.countries() as any
	// await prismaService.country.create({ data: country,include:{provinces:} })
}

Seed()
