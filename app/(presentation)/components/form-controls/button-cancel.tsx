import { ButtonHTMLAttributes, HTMLAttributes } from 'react'
import { IconClose } from '..'

type ButtonCancelProps = HTMLAttributes<HTMLSpanElement> & {
	text?: string
	showIcon?: boolean
}

export function ButtonCancel({
	text = 'Cancelar',
	showIcon = true,
	className,
	...props
}: ButtonCancelProps) {
	return (
		<span className={`btn-default ${className || ''}`} {...props}>
			{text} {showIcon && <IconClose />}
		</span>
	)
}
