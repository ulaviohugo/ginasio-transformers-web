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

		Promise.all(
			countries.map(async ({ name, provinces }) => {
				console.log(`Seeding country: ${name}`)
				this.log('country', name)
				const country = await prisma.country.create({ data: { name } })
				this.log('country', name, 'finished')

				if (provinces && provinces.length > 0) {
					await this.seedProvince(provinces, country.id)
				}
			})
		)
	}

	static async seedProvince(provincesData: ProvinceProps[], countryId: number) {
		if (!provincesData?.length) return

		const provinces = ArrayUtils.order<ProvinceProps>({
			data: provincesData,
			field: 'name'
		})

		Promise.all(
			provinces.map(async ({ name, municipalities }) => {
				this.log('province', name)
				const province = await prisma.province.create({ data: { name, countryId } })
				this.log('province', name, 'finished')

				if (municipalities && municipalities.length > 0) {
					this.seedMunicipalities(municipalities, province.id)
				}
			})
		)
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
		Promise.all(
			municipalities.map(async ({ name }) => {
				this.log('municipality', name)
				await prisma.municipality.create({ data: { name, provinceId } })
				this.log('municipality', name, 'finished')
			})
		)
	}

	private static log(
		resourceType: 'country' | 'province' | 'municipality',
		resourceName: string,
		type: 'started' | 'finished' = 'started'
	) {
		console.log(`${type} seeding ${resourceType}: ${resourceName}`)
	}
}
