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
				cardName: true,
				dateOfBirth: true,
				documentType: true,
				documentNumber: true,
				policyholderId: true,
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
		createdBy: {
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
						policyholderId: insured.id,
						createdById: insured.createdById
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
		return (await this.prisma.insured.findUnique({
			where: { id },
			include: this.include
		})) as any
	}

	async findByEmail(email: string): Promise<InsuredModel | null> {
		return (await this.prisma.insured.findFirst({
			where: { email }
		})) as any
	}

	async findByDocument(
		documentType: string,
		documentNumber: string
	): Promise<InsuredModel | null> {
		return (await this.prisma.insured.findFirst({
			where: { documentType, documentNumber }
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
