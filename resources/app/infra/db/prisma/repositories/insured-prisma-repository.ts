import { InsuredRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { InsuredModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaInsuredMapper } from '@/infra/db/prisma/mappers'

export class InsuredPrismaRepository implements InsuredRepository {
	private prisma: PrismaClient
	private include = {
		insureds: {
			select: {
				id: true,
				name: true,
				card_name: true,
				date_of_birth: true,
				document_type: true,
				document_number: true,
				policyholder_id: true,
				nif: true,
				gender: true,
				student: true,
				occupation: true,
				phone: true,
				relationship: true
			}
		},
		policyholder: {
			select: {
				id: true,
				name: true
			}
		},
		user: {
			select: { id: true, name: true }
		}
	}
	constructor() {
		this.prisma = prismaService
	}

	async add(param: InsuredModel): Promise<InsuredModel> {
		const { insureds, ...policyholder } = param
		const insured = await this.prisma.insured.create({
			data: PrismaInsuredMapper.toPrisma(policyholder),
			include: this.include
		})
		if (insureds?.length) {
			await this.prisma.insured.createMany({
				data: insureds.map((item) =>
					PrismaInsuredMapper.toPrisma({
						...item,
						policyholder_id: insured.id,
						user_id: insured.user_id as any
					})
				)
			})
		}
		return (await this.findById(insured.id)) as any
	}

	async loadAll(): Promise<InsuredModel[]> {
		return (await this.prisma.insured.findMany({
			include: this.include
		})) as any
	}

	async findById(id: number): Promise<InsuredModel | null> {
		return this.prisma.insured.findUnique({
			where: { id },
			include: this.include
		}) as any
	}

	async findByEmail(email: string): Promise<InsuredModel | null> {
		return (await this.prisma.insured.findFirst({
			where: { email }
		})) as any
	}

	async findByDocument(
		document_type: string,
		document_number: string
	): Promise<InsuredModel | null> {
		return (await this.prisma.insured.findFirst({
			where: { document_type, document_number }
		})) as any
	}

	async count(): Promise<number> {
		return this.prisma.insured.count()
	}

	async update(param: InsuredModel): Promise<InsuredModel> {
		return (await this.prisma.insured.update({
			data: PrismaInsuredMapper.toPrisma(param),
			where: { id: param.id },
			include: this.include
		})) as any
	}

	async delete(insuredId: number): Promise<boolean> {
		const deletedInsured = await this.prisma.insured.delete({
			where: { id: insuredId }
		})
		return !!deletedInsured
	}
}
