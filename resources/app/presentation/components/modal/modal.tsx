import React, { ReactNode, useState } from 'react'
import { IconClose } from '..'

type ModalProps = {
	children: ReactNode
	onClose?: () => void
	show: boolean
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Modal({ children, onClose, show, size = 'xl' }: ModalProps) {
	const [open, setOpen] = useState(show)
	const handleClose = () => {
		if (onClose) {
			onClose()
		}
		setOpen(false)
	}
	if (!open) return <></>
	const w: any = {
		sm: 'max-w-lg',
		md: 'max-w-2xl',
		lg: 'max-w-5xl',
		xl: 'max-w-7xl',
		full: 'max-w-full'
	}
	return (
		<div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
			<div
				className={`relative flex flex-col bg-white p-5 mx-5 rounded-lg max-h-[90%] w-full ${w[size]}`}
			>
				<button
					className="absolute right-2 top-2 group"
					onClick={handleClose}
					title="Fechar janela"
				>
					<IconClose
						size={24}
						className="group-hover:scale-150 transition-all duration-100 ease-in"
					/>
				</button>
				{children}
			</div>
		</div>
	)
}

type ModalTitleProps = {
	children: ReactNode
}

export function ModalTitle({ children }: ModalTitleProps) {
	return (
		<div className="flex gap-1 items-center text-xl font-semibold mb-4">{children}</div>
	)
}

type ModalBodyProps = {
	children: ReactNode
}

export function ModalBody({ children }: ModalBodyProps) {
	return <div className="overflow-auto p-1 max-h-[95%] w-full">{children}</div>
}

export function ModalFooter({ children }: ModalTitleProps) {
	return <div className="flex gap-2 items-center mt-2 pt-2 border-t">{children}</div>
}
