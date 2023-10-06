import { NotificationRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { NotificationModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaNotificationMapper } from '@/infra/db/prisma/mappers'

export class NotificationPrismaRepository implements NotificationRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: NotificationModel): Promise<NotificationModel> {
		return (await this.prisma.notification.create({
			data: PrismaNotificationMapper.toPrisma(param),
			include: {
				stock: {
					select: {
						id: true,
						quantity: true,
						product: { select: { id: true, name: true } },
						category: { select: { id: true, name: true } }
					}
				}
			}
		})) as NotificationModel
	}

	async loadAll(): Promise<NotificationModel[]> {
		return (await this.prisma.notification.findMany({
			include: {
				stock: {
					select: {
						id: true,
						quantity: true,
						product: { select: { id: true, name: true } },
						category: { select: { id: true, name: true } }
					}
				}
			}
		})) as NotificationModel[]
	}

	async findById(id: number): Promise<NotificationModel | null> {
		return (await this.prisma.notification.findUnique({
			where: { id },
			include: {
				stock: {
					select: {
						id: true,
						quantity: true,
						product: { select: { id: true, name: true } },
						category: { select: { id: true, name: true } }
					}
				}
			}
		})) as NotificationModel
	}

	async count(): Promise<number> {
		return this.prisma.notification.count()
	}

	async update(param: NotificationModel): Promise<NotificationModel> {
		return (await this.prisma.notification.update({
			data: PrismaNotificationMapper.toPrisma(param),
			where: { id: param.id },
			include: {
				stock: {
					select: {
						id: true,
						quantity: true,
						product: { select: { id: true, name: true } },
						category: { select: { id: true, name: true } }
					}
				}
			}
		})) as NotificationModel
	}

	async delete(notificationId: number): Promise<boolean> {
		const deletedNotification = await this.prisma.notification.delete({
			where: { id: notificationId }
		})
		return !!deletedNotification
	}
}
