import React, { ElementType, HTMLAttributes, ReactNode } from 'react'
import { StringUtils } from '@/utils'

type InputProps = HTMLAttributes<HTMLInputElement> & {
	children: ReactNode
	label?: ReactNode
	icon?: ElementType
	focused?: boolean
	required?: boolean
}

export function FormControlWrapper({
	label,
	icon: Icon,
	children,
	focused,
	required,
	...props
}: InputProps) {
	const id = props.id || StringUtils.generate({ length: 3 })
	return (
		<div className="flex-1 flex flex-col gap-[2px]">
			<div className="flex gap-1">
			{required && <span className='text-red-600'>*</span>}
				{label && (
					<label htmlFor={id} className="font-semibold text-sm cursor-pointer mr-auto">
						{label}
					</label>
				)}
			</div>
			<label
				htmlFor={id}
				className={`flex flex-1 items-center gap-1 mx-[2px] bg-white rounded-md py-1 px-2 border transition-all duration-200 ease-in
				${focused && 'ring-2 ring-gray-400'}`}
			>
				{Icon && <Icon className="cursor-pointer" size={20} />}
				{children}
			</label>
		</div>
	)
}
