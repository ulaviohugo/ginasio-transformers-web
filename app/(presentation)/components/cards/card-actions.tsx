import React from 'react'
import { IconEdit, IconTrash } from '..'

type CardFooterProps = {
	onClickEdit?: () => void
	onClickDelete?: () => void
	border?: boolean
}

export function CardActions({
	onClickDelete,
	onClickEdit,
	border = false
}: CardFooterProps) {
	return (
		<div className={`flex items-center gap-1 text-xl ${border && 'border-t mt-1 pt-1'} `}>
			<button
				onClick={onClickEdit}
				className="hover:scale-110"
				title="Editar funcionário"
			>
				<IconEdit />
			</button>
			<button
				onClick={onClickDelete}
				className="hover:scale-110"
				title="Excluir funcionário"
			>
				<IconTrash />
			</button>
		</div>
	)
}
