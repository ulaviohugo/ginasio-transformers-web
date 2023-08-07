import { StringUtils } from '@/app/utils'
import { ElementType, HTMLAttributes, ReactNode } from 'react'

type InputProps = HTMLAttributes<HTMLInputElement> & {
	children: ReactNode
	label?: string
	icon?: ElementType
}

export function FormControlWrapper({
	label,
	icon: Icon,
	children,
	...props
}: InputProps) {
	const id = props.id || StringUtils.generate({ length: 3 })
	return (
		<div className="flex flex-col gap-[2px]">
			{label && (
				<label htmlFor={id} className="font-semibold text-sm cursor-pointer mr-auto">
					{label}
				</label>
			)}
			<label
				htmlFor={id}
				className="flex items-center gap-1 bg-white rounded-md py-1 px-2 border"
			>
				{Icon && <Icon className="cursor-pointer" size={20} />}
				{children}
			</label>
		</div>
	)
}
