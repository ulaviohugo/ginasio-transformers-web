import React, { ImgHTMLAttributes } from 'react'
import { GiMuscleFat } from 'react-icons/gi'

type LogoProps = ImgHTMLAttributes<HTMLImageElement>

export function IconIMC({
	src = '/images/iconIMC.png',
	alt = 'Logo',
	width = 80,
	height = 20,
	...props
}: LogoProps) {
	return <img src={src} style={{ width, height }} />
}
