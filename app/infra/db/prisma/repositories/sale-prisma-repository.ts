import { SaleRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { SaleModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaSaleMapper } from '@/infra/db/prisma/mappers'

export class SalePrismaRepository implements SaleRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: SaleModel): Promise<SaleModel> {
		const createdSale = (await this.prisma.sale.create({
			data: PrismaSaleMapper.toPrisma(param),
			include: {
				purchase: {
					include: {
						category: true,
						product: true
					}
				},
				employee: {
					select: {
						id: true,
						name: true
					}
				},
				customer: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})) as any

		return createdSale
	}

	async loadAll(): Promise<SaleModel[]> {
		return (await this.prisma.sale.findMany({
			include: {
				purchase: {
					include: {
						category: true,
						product: true
					}
				},
				employee: {
					select: {
						id: true,
						name: true
					}
				},
				customer: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})) as any
	}

	async findById(id: number): Promise<SaleModel | null> {
		return (await this.prisma.sale.findUnique({
			where: { id },
			include: {
				purchase: {
					include: {
						category: true,
						product: true
					}
				},
				employee: {
					select: {
						id: true,
						name: true
					}
				},
				customer: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})) as any
	}

	async count(): Promise<number> {
		return this.prisma.sale.count()
	}

	async update(param: SaleModel): Promise<SaleModel> {
		return (await this.prisma.sale.update({
			data: PrismaSaleMapper.toPrisma(param),
			where: { id: param.id },
			include: {
				purchase: {
					include: {
						category: true,
						product: true
					}
				},
				employee: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})) as any
	}

	async delete(id: number): Promise<boolean> {
		const deletedSale = await this.prisma.sale.delete({
			where: { id }
		})
		return !!deletedSale
	}
}
