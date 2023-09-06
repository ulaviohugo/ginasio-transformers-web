import { SupplierRepository } from '@/data/protocols'
import { prismaService } from '..'
import { SupplierModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaSupplierMapper } from '../mappers'

export class SupplierPrismaRepository implements SupplierRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: SupplierModel): Promise<SupplierModel> {
		const createdSupplier = (await this.prisma.supplier.create({
			data: {
				...PrismaSupplierMapper.toPrisma(param),
				supplierProducts: { createMany: { data: param.supplierProducts as any } }
			},
			include: {
				supplierProducts: {
					select: {
						id: true,
						supplierId: true,
						categoryId: true,
						productId: true,
						unitPrice: true,
						category: { select: { name: true } },
						product: { select: { name: true } }
					}
				}
			}
		})) as SupplierModel

		return createdSupplier
	}

	async loadAll(): Promise<SupplierModel[]> {
		return (await this.prisma.supplier.findMany({
			include: {
				supplierProducts: {
					select: {
						id: true,
						supplierId: true,
						categoryId: true,
						productId: true,
						unitPrice: true,
						category: { select: { name: true } },
						product: { select: { name: true } }
					}
				}
			}
		})) as SupplierModel[]
	}

	async findById(id: number): Promise<SupplierModel | null> {
		return (await this.prisma.supplier.findUnique({
			where: { id }
		})) as SupplierModel
	}

	async findByEmail(email: string): Promise<SupplierModel | null> {
		return (await this.prisma.supplier.findUnique({
			where: { email }
		})) as SupplierModel
	}

	async count(): Promise<number> {
		return this.prisma.supplier.count()
	}

	async update(param: SupplierModel): Promise<SupplierModel> {
		const updatedSupplier = (await this.prisma.supplier.update({
			data: PrismaSupplierMapper.toPrisma(param),
			where: { id: param.id },
			include: {
				supplierProducts: {
					select: {
						id: true,
						supplierId: true,
						categoryId: true,
						productId: true,
						unitPrice: true,
						category: { select: { name: true } },
						product: { select: { name: true } }
					}
				}
			}
		})) as SupplierModel

		return updatedSupplier
	}

	async delete(supplierId: number): Promise<boolean> {
		const deletedSupplier = await this.prisma.supplier.delete({
			where: { id: supplierId }
		})
		return !!deletedSupplier
	}
}
