import { PurchaseRepository, QueryParams } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { PurchaseModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaFilterMapper, PrismaPurchaseMapper } from '@/infra/db/prisma/mappers'

export class PurchasePrismaRepository implements PurchaseRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: PurchaseModel): Promise<PurchaseModel> {
		return (await this.prisma.purchase.create({
			data: PrismaPurchaseMapper.toPrisma(param),
			include: {
				category: { select: { name: true } },
				product: { select: { name: true } },
				supplier: { select: { name: true } }
			}
		})) as any
	}

	async loadAll(queryParams: QueryParams<PurchaseModel>): Promise<PurchaseModel[]> {
		const filter = queryParams
			? PrismaFilterMapper.toWhere(queryParams.filter)
			: undefined

		return (await this.prisma.purchase.findMany({
			include: {
				category: { select: { name: true } },
				product: { select: { name: true } },
				supplier: { select: { name: true } }
			},
			where: filter
		})) as any
	}

	async findById(id: number): Promise<PurchaseModel | null> {
		return (await this.prisma.purchase.findUnique({
			where: { id },
			include: {
				category: { select: { name: true } },
				product: { select: { name: true } },
				supplier: { select: { name: true } }
			}
		})) as any
	}

	async findLowStock(): Promise<PurchaseModel[]> {
		return (await this.prisma.purchase.findMany({
			where: { quantity: { lt: 5 } },
			include: {
				category: { select: { name: true } },
				product: { select: { name: true } },
				supplier: { select: { name: true } }
			}
		})) as any
	}

	async count(): Promise<number> {
		return this.prisma.purchase.count()
	}

	async update(param: PurchaseModel): Promise<PurchaseModel> {
		return (await this.prisma.purchase.update({
			data: PrismaPurchaseMapper.toPrisma(param),
			where: { id: param.id },
			include: {
				category: { select: { name: true } },
				product: { select: { name: true } },
				supplier: { select: { name: true } }
			}
		})) as any
	}

	async delete(id: number): Promise<boolean> {
		const deletedPurchase = await this.prisma.purchase.delete({
			where: { id }
		})
		return !!deletedPurchase
	}
}
