import React from 'react'
import { Button, ButtonProps, IconCheck } from '..'
export function ButtonSubmit({
	text = 'Salvar',
	icon: Icon = IconCheck,
	variant = 'green',
	...props
}: Partial<ButtonProps>) {
	return <Button variant={variant} text={text} icon={Icon} {...props} />
}
