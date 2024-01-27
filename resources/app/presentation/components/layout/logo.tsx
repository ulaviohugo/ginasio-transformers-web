import React, { ImgHTMLAttributes } from 'react'
import { GiMuscleFat } from 'react-icons/gi'

type LogoProps = ImgHTMLAttributes<HTMLImageElement>

export function Logo({
	src = '/images/logo.png',
	alt = 'Logo',
	width = 100,
	height = 100,
	...props
}: LogoProps) {
	return <img src={src} style={{ width, height }} />
}
