'use client'

import { StringUtils } from '@/app/utils'
import { ElementType, TextareaHTMLAttributes, useState } from 'react'
import { FormControlWrapper } from '.'

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string
	icon?: ElementType
}

export function TextArea({ label, icon: Icon, className, ...props }: InputProps) {
	const [focused, setFocused] = useState(false)
	const id = props.id || StringUtils.generate({ length: 3 })

	return (
		<FormControlWrapper label={label} icon={Icon} id={id} focused={focused}>
			<textarea
				className={`focus:outline-none text-sm ${className || ''}`}
				id={id}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				{...props}
			/>
		</FormControlWrapper>
	)
}
