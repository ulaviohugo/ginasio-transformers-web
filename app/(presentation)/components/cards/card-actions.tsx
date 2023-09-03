import React, { HtmlHTMLAttributes } from 'react'
import { IconEdit, IconTrash } from '..'

type CardFooterProps = HtmlHTMLAttributes<HTMLDivElement> & {
	onClickEdit?: () => void
	onClickDelete?: () => void
	border?: boolean
}

export function CardActions({
	onClickDelete,
	onClickEdit,
	border = false,
	className,
	...props
}: CardFooterProps) {
	return (
		<div
			className={`flex items-center gap-1 text-xl ${border && 'border-t mt-1 pt-1'} ${
				className || ''
			}`}
			{...props}
		>
			<button onClick={onClickEdit} className="hover:scale-110" title="Editar">
				<IconEdit />
			</button>
			<button onClick={onClickDelete} className="hover:scale-110" title="Excluir">
				<IconTrash />
			</button>
		</div>
	)
}
