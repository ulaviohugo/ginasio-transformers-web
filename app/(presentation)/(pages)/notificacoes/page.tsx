'use client'

import {
	IconNotification,
	Layout,
	LayoutBody,
	Spinner,
	Title
} from '@/app/(presentation)/components'
import { ElementType, useEffect, useState } from 'react'
import Link from 'next/link'

import { toast } from 'react-hot-toast'
import { useNotifications } from '../../hooks'
import { RemoteLoadNotifications } from '@/app/data/usecases'
import { useDispatch } from 'react-redux'
import { loadNotificationStore } from '../../redux'
import { makeRemoteLoadNotifications } from '@/app/main/factories/usecases/remote'

export default function Notifications() {
	const dispatch = useDispatch()
	const notifications = useNotifications()
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		makeRemoteLoadNotifications()
			.load()
			.then((response) => {
				dispatch(loadNotificationStore(response))
			})
			.catch((error) => {
				toast.error(error.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return (
		<Layout>
			<LayoutBody>
				<Title title={`Notificações `} icon={IconNotification} />
				{isLoading ? (
					<Spinner data="Carregando notificações" />
				) : (
					<ul className="flex flex-col">
						{notifications.map(
							({ id, text, notifiable, notifiableId, createdAt, stock }, i) => (
								<li
									key={id}
									className={`flex flex-col p-1 ${
										i < notifications.length - 1 && 'border-b'
									}`}
								>
									<div>{text}</div>
									<div className="flex gap-2 text-sm">
										<div>{stock?.product?.name}</div>
										<div className="">Quantidade restante: {stock?.quantity}</div>
									</div>
								</li>
							)
						)}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}
