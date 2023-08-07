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
				{defaultText && <option disabled>{defaultText}</option>}
				{data.map((option) => {
					return <option key={option.value || option.text}>{option.text}</option>
				})}
			</select>
		</FormControlWrapper>
	)
}
