import React, { ElementType, ReactNode, SelectHTMLAttributes, useState } from 'react'
import { StringUtils } from '@/utils'
import { FormControlWrapper } from '.'

type InputProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label?: ReactNode
	icon?: ElementType
	data: Array<{ text: string; value?: string | number }>
	defaultText?: string
}

export function Select({
	label,
	icon: Icon,
	data,
	defaultText,
	className,
	...props
}: InputProps) {
	const [focused, setFocused] = useState(false)
	const id = props.id || StringUtils.generate({ length: 3 })

	return (
		<FormControlWrapper label={label} icon={Icon} id={id} focused={focused}>
			<select
				className={`focus:outline-none text-sm ${className || ''} w-full`}
				id={id}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				{...props}
			>
				{defaultText && <option value="">{defaultText}</option>}
				{data?.map((option) => {
					const value = option?.value || option.text
					return (
						<option key={value} value={value}>
							{option.text}
						</option>
					)
				})}
			</select>
		</FormControlWrapper>
	)
}
