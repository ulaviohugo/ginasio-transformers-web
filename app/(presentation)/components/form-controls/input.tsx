'use client'

import { StringUtils } from '@/app/utils'
import { ElementType, InputHTMLAttributes, useState } from 'react'
import { FormControlWrapper } from '.'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	icon?: ElementType
}

export function Input({ label, icon: Icon, className, ...props }: InputProps) {
	const [focused, setFocused] = useState(false)
	const id = props.id || StringUtils.generate({ length: 3 })

	return (
		<FormControlWrapper label={label} icon={Icon} id={id} focused={focused}>
			<input
				className={`focus:outline-none text-sm ${className || ''}`}
				id={id}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				{...props}
			/>
		</FormControlWrapper>
	)
}
