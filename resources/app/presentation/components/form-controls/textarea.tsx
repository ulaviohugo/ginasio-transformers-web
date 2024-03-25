import React, { ElementType, TextareaHTMLAttributes, useState } from 'react'
import { StringUtils } from '@/utils'
import { FormControlWrapper } from '.'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string
	icon?: ElementType
}

export function TextArea({ label, icon: Icon, className, required, ...props }: TextareaProps) {
	const [focused, setFocused] = useState(false)
	const id = props.id || StringUtils.generate({ length: 3 })

	return (
		<FormControlWrapper label={label} icon={Icon} required={required} id={id} focused={focused}>
			<textarea
				className={`focus:outline-none text-sm ${className || ''} w-full`}
				id={id}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				{...props}
			/>
		</FormControlWrapper>
	)
}
