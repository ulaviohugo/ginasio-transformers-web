import { prismaService as prisma } from '@/app/infra/db'
import {
	ArrayUtils,
	CountryProps,
	LocationUtils,
	MunicipalityProps,
	ProvinceProps
} from '@/app/utils'
import { Municipality } from '@prisma/client'

export class LocationSeeder {
	static async run() {
		await this.seedCountry(LocationUtils.countries())
	}

	static async seedCountry(countriesData: CountryProps[]) {
		if (!countriesData?.length) return
		const countries = ArrayUtils.order<CountryProps>({
			data: countriesData,
			field: 'name'
		})
		console.log(`Country seeding started`)
		Promise.all(
			countries.map(async ({ name, provinces }) => {
				const country = await prisma.country.create({ data: { name } })

				if (provinces && provinces.length > 0) {
					await this.seedProvince(provinces, country.id)
				}
			})
		)
		console.log(`Country seeding finished`)
	}

	static async seedProvince(provincesData: ProvinceProps[], countryId: number) {
		if (!provincesData?.length) return
		const provinces = ArrayUtils.order<ProvinceProps>({
			data: provincesData,
			field: 'name'
		})

		console.log(`Province seeding started`)
		Promise.all(
			provinces.map(async ({ name, municipalities }) => {
				const province = await prisma.province.create({ data: { name, countryId } })

				if (municipalities && municipalities.length > 0) {
					this.seedMunicipalities(municipalities, province.id)
				}
			})
		)
		console.log(`Province seeding finished`)
	}

	static async seedMunicipalities(
		municipalitiesData: Municipality[],
		provinceId: number
	) {
		if (!municipalitiesData?.length) return
		const municipalities = ArrayUtils.order<MunicipalityProps>({
			data: municipalitiesData,
			field: 'name'
		})
		console.log(`Municipality seeding started`)
		Promise.all(
			municipalities.map(async ({ name }) => {
				await prisma.municipality.create({ data: { name, provinceId } })
			})
		)
		console.log(`Municipality seeding finished`)
	}
}
