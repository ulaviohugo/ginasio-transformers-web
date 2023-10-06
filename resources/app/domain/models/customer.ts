export interface CustomerModel {
	id: number
	photo?: string
	name: string
	gender: string
	dateOfBirth?: Date
	phone?: string
	email?: string
	countryId: number
	provinceId?: number
	municipalityId?: number
	residentialAddress: string
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number
}
