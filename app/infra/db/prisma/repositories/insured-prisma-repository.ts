import { InsuredRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { InsuredModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaInsuredMapper } from '@/infra/db/prisma/mappers'

export class InsuredPrismaRepository implements InsuredRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: InsuredModel): Promise<InsuredModel> {
		return (await this.prisma.insured.create({
			data: PrismaInsuredMapper.toPrisma(param)
		})) as any
	}

	async loadAll(): Promise<InsuredModel[]> {
		return (await this.prisma.insured.findMany()) as any
	}

	async findById(id: number): Promise<InsuredModel | null> {
		return (await this.prisma.insured.findUnique({
			where: { id }
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
			where: { id: param.id }
		})) as any
	}

	async delete(insuredId: number): Promise<boolean> {
		const deletedInsured = await this.prisma.insured.delete({
			where: { id: insuredId }
		})
		return !!deletedInsured
	}
}
