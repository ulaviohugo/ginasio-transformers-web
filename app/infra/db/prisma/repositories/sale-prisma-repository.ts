import { SaleRepository } from '@/app/data/protocols'
import { prismaService } from '..'
import { Sale } from '@/app/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaSaleMapper } from '../mappers'

export class SalePrismaRepository implements SaleRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: Sale): Promise<Sale> {
		return (await this.prisma.sale.create({
			data: PrismaSaleMapper.toPrisma(param),
			include: {
				purchase: {
					include: {
						category: true,
						product: true
					}
				}
			}
		})) as Sale
	}

	async loadAll(): Promise<Sale[]> {
		return (await this.prisma.sale.findMany({
			include: {
				purchase: {
					include: {
						category: true,
						product: true
					}
				}
			}
		})) as Sale[]
	}

	async findById(id: number): Promise<Sale | null> {
		return (await this.prisma.sale.findUnique({
			where: { id }
		})) as Sale
	}

	async count(): Promise<number> {
		return this.prisma.sale.count()
	}

	async update(param: Sale): Promise<Sale> {
		return (await this.prisma.sale.update({
			data: PrismaSaleMapper.toPrisma(param),
			where: { id: param.id },
			include: {
				purchase: {
					include: {
						category: true,
						product: true
					}
				}
			}
		})) as Sale
	}

	async delete(id: number): Promise<boolean> {
		const deletedSale = await this.prisma.sale.delete({
			where: { id }
		})
		return !!deletedSale
	}
}
