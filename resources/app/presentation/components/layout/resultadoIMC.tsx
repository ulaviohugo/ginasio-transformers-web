import React, { ImgHTMLAttributes } from 'react'
import { GiMuscleFat } from 'react-icons/gi'

type LogoProps = ImgHTMLAttributes<HTMLImageElement>

export function ResultadoIMC({
	src = '/images/resultadoIMC.png',
	alt = 'Logo',
	width = 800,
	height = 450,
	...props
}: LogoProps) {
	return <img src={src} style={{ width, height }} />
}
