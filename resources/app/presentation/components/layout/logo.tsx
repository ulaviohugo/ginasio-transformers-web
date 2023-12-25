import React, { ImgHTMLAttributes } from 'react'

type LogoProps = ImgHTMLAttributes<HTMLImageElement>

export function Logo({
	src = '/images/logo.png',
	alt = 'Logo',
	width = 100,
	height = 100,
	...props
}: LogoProps) {
	return <img src={src} width={width} height={height} alt={alt} {...props} />
}
