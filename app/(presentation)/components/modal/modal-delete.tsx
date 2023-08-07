'use client'

import { ReactNode, useState } from 'react'
import { Modal, ModalBody, ModalTitle } from '.'
import { IconTrash, Spinner } from '..'

type ModalDeleteProps = {
	entity: ReactNode
	description?: ReactNode
	show: boolean
	onClose: () => void
	onSubmit: () => Promise<void>
}

export function ModalDelete({
	description,
	entity,
	onClose,
	show,
	onSubmit
}: ModalDeleteProps) {
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async () => {
		setIsLoading(true)
		await onSubmit()
		setIsLoading(false)
	}

	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>
				<IconTrash /> Excluir {entity}
			</ModalTitle>
			<ModalBody>
				<div className="flex flex-col gap-2 max-w-xs">
					{description ?? `Deseja realmente excluir o(a) ${entity}?`}
					<div className="flex gap-1 text-sm">
						<button
							type="submit"
							disabled={isLoading}
							className="flex items-center gap-2 mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
							onClick={handleSubmit}
						>
							Excluir {isLoading ? <Spinner /> : <IconTrash />}
						</button>
						<span
							className="flex items-center gap-2 mt-4 bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded cursor-pointer"
							onClick={onClose}
						>
							Cancelar
						</span>
					</div>
				</div>
			</ModalBody>
		</Modal>
	)
}
