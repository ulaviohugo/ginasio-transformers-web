import { PurchaseRepository } from '@/app/data/protocols'
import { prismaService } from '..'
import { PurchaseModel } from '@/app/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaPurchaseMapper } from '../mappers'

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
		})) as PurchaseModel
	}

	async loadAll(): Promise<PurchaseModel[]> {
		return (await this.prisma.purchase.findMany({
			include: {
				category: { select: { name: true } },
				product: { select: { name: true } },
				supplier: { select: { name: true } }
			}
		})) as PurchaseModel[]
	}

	async findById(id: number): Promise<PurchaseModel | null> {
		return (await this.prisma.purchase.findUnique({
			where: { id }
		})) as PurchaseModel
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
		})) as PurchaseModel
	}

	async delete(id: number): Promise<boolean> {
		const deletedPurchase = await this.prisma.purchase.delete({
			where: { id }
		})
		return !!deletedPurchase
	}
}
