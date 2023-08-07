import { StringUtils } from '@/app/utils'
import { ElementType, SelectHTMLAttributes } from 'react'
import { FormControlWrapper } from '.'

type InputProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string
	icon?: ElementType
	data: Array<{ text: string; value?: string }>
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
	const id = props.id || StringUtils.generate({ length: 3 })
	return (
		<FormControlWrapper label={label} icon={Icon} id={id}>
			<select
				className={`focus:outline-none text-sm ${className || ''}`}
				id={id}
				{...props}
			>
				{defaultText && (
					<option disabled value="">
						{defaultText}
					</option>
				)}
				{data.map((option) => {
					const value = option.value || option.text
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
