import React, { HtmlHTMLAttributes } from 'react'
import { IconEdit, IconInfo, IconTrash } from '..'

type CardFooterProps = HtmlHTMLAttributes<HTMLDivElement> & {
	onClickEdit?: () => void
	onClickDelete?: () => void
	onClickInfo?: () => void
	border?: boolean
}

export function CardActions({
	onClickDelete,
	onClickEdit,
	onClickInfo,
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
			<button
				type="button"
				onClick={onClickEdit}
				className="hover:scale-110"
				title="Editar"
			>
				<IconEdit />
			</button>
			<button
				type="button"
				onClick={onClickDelete}
				className="hover:scale-110"
				title="Excluir"
			>
				<IconTrash />
			</button>
			<button
				type="button"
				onClick={onClickInfo}
				className="hover:scale-110"
				title="Informação"
			>
				<IconInfo />
			</button>
		</div>
	)
}
