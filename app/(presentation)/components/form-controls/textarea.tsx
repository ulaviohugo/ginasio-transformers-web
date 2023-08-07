import { StringUtils } from '@/app/utils'
import { ElementType, TextareaHTMLAttributes } from 'react'
import { FormControlWrapper } from '.'

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string
	icon?: ElementType
}

export function TextArea({ label, icon: Icon, className, ...props }: InputProps) {
	const id = props.id || StringUtils.generate({ length: 3 })
	return (
		<FormControlWrapper label={label} icon={Icon} id={id}>
			<textarea
				className={`focus:outline-none text-sm ${className || ''}`}
				id={id}
				{...props}
			/>
		</FormControlWrapper>
	)
}
