import Image, { ImageProps } from 'next/image'
import React from 'react'

type LogoProps = Partial<ImageProps>

export function Logo({
	src = '/images/logo-tipo.png',
	alt = 'Logo',
	width = 100,
	height = 100,
	...props
}: LogoProps) {
	return <Image src={src} width={width} height={height} alt={alt} {...props} />
}
