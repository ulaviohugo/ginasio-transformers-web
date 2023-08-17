import { ButtonHTMLAttributes, ElementType } from 'react'
import { IconCheck, Spinner } from '..'

type ButtonSaveProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	text?: string
	isLoading?: boolean
	showIcon?: boolean
	icon?: ElementType
}

export function ButtonSubmit({
	isLoading,
	text = 'Salvar',
	showIcon = true,
	icon: Icon = IconCheck,
	className,
	...props
}: ButtonSaveProps) {
	return (
		<button
			type="submit"
			disabled={isLoading}
			className={`btn-primary ${className || ''}`}
			{...props}
		>
			{text} {isLoading ? <Spinner /> : showIcon && <Icon />}
		</button>
	)
}
