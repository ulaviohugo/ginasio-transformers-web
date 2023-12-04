import React from 'react'
import { Button, ButtonProps, IconClose } from '..'

export function ButtonCancel({
	icon = IconClose,
	variant = 'default',
	...props
}: Partial<ButtonProps>) {
	return <Button variant={variant} icon={icon} {...props} />
}
