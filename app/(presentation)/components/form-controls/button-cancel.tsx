import { ButtonHTMLAttributes, ElementType, HTMLAttributes } from 'react'
import { IconClose } from '..'

type ButtonCancelProps = HTMLAttributes<HTMLSpanElement> & {
	text?: string
	showIcon?: boolean
	icon?: ElementType
}

export function ButtonCancel({
	text = 'Cancelar',
	showIcon = true,
	className,
	icon: Icon = IconClose,
	...props
}: ButtonCancelProps) {
	return (
		<span className={`btn-default ${className || ''}`} {...props}>
			{text} {showIcon && <Icon />}
		</span>
	)
}
