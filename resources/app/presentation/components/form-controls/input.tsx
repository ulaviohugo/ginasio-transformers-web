import React, { ElementType, InputHTMLAttributes, KeyboardEvent, useState } from 'react'
import MaskedInput, { Mask } from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import emailMask from 'text-mask-addons/dist/emailMask'

import { NumberUtils, StringUtils } from '@/utils'
import { FormControlWrapper } from '.'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	icon?: ElementType
}

const maskIBAN = [
	'A',
	'O',
	/[0-9]/,
	/\d/,
	'.',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	'.',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	'.',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	'.',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	'.',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	'.',
	/\d/
]

const handleKeyDown = (
	e: KeyboardEvent<HTMLInputElement>,
	props: InputHTMLAttributes<HTMLInputElement>
) => {
	const inputEl = e.target as HTMLInputElement
	if (inputEl.readOnly || inputEl.disabled) return
	if (['ArrowUp', 'ArrowDown'].includes(e.code)) {
		let currentValue: any = NumberUtils.convertToNumber((e.target as any).value)
		if (e.code === 'ArrowUp') {
			currentValue++
		} else if (e.key === 'ArrowDown') {
			currentValue--
		}
		if (props.onChange) {
			props.onChange({ target: { name: props.name, value: currentValue } } as any)
		}
	}
}

export function Input({ label, icon: Icon, className,required, ...props }: InputProps) {
	const [focused, setFocused] = useState(false)
	const id = props.id || StringUtils.generate({ length: 3 })

	return (
		<FormControlWrapper label={label} required={required} icon={Icon} id={id} focused={focused}>
			<input
				className={`focus:outline-none text-sm w-full ${className || ''}`}
				id={id}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				{...props}
			/>
		</FormControlWrapper>
	)
}

export function InputPhone(props: InputProps) {
	const mask = [/[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]
	return <InputMask mask={mask} {...props} />
}

export function InputYear(props: InputProps) {
	const mask = ['2', '0', /[0-9]/, /\d/]
	return <InputMask mask={mask} {...props} />
}

export function InputPrice(props: InputProps) {
	const priceMask = createNumberMask({
		prefix: '',
		// suffix: ' Kz',
		thousandsSeparatorSymbol: ' ',
		allowDecimal: true,
		decimalSymbol: '.',
		decimalLimit: 2,
		allowNegative: true
	})
	return (
		<InputMask mask={priceMask} {...props} onKeyDown={(e) => handleKeyDown(e, props)} />
	)
}

export function InputNumber(props: InputProps) {
	const priceMask = createNumberMask({
		prefix: '',
		// suffix: ' Kz',
		thousandsSeparatorSymbol: ' ',
		allowDecimal: true,
		decimalSymbol: '.',
		decimalLimit: 2,
		allowNegative: true
	})
	return (
		<InputMask mask={priceMask} {...props} onKeyDown={(e) => handleKeyDown(e, props)} />
	)
}

export function InputEmail(props: InputProps) {
	return <InputMask mask={emailMask} {...props} />
}

export function InputIBAN(props: InputProps) {
	return <InputMask mask={maskIBAN} {...props} />
}

type InputMaskProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	icon?: ElementType
	mask: Mask
}

export function InputMask({
	label,
	icon: Icon,
	mask,
	className,
	required,
	...props
}: InputMaskProps) {
	const [focused, setFocused] = useState(false)
	const id = props.id || StringUtils.generate({ length: 3 })

	return (
		<FormControlWrapper label={label} required={required} icon={Icon} id={id} focused={focused}>
			<MaskedInput
				mask={mask}
				guide={false}
				className={`focus:outline-none text-sm w-full ${className || ''}`}
				id={id}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				{...props}
			/>
		</FormControlWrapper>
	)
}
