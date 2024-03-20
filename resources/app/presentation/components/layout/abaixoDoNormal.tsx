import React, { ImgHTMLAttributes } from 'react'
import { GiMuscleFat } from 'react-icons/gi'

type LogoProps = ImgHTMLAttributes<HTMLImageElement>

export function AbaixoDoNormal({
	src = '/images/abaixoDoNormal.png',
	alt = 'Logo',
	width = 158,
	height = 300,
	...props
}: LogoProps) {
	return <img src={src} style={{ width, height }} />
}
