'use client'

import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { IconClose } from '.'

type ImagePreviewProps = {
	photoPreview: string
	clearInputFile?: () => void
	onInputFileChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function ImagePreview({
	photoPreview,
	clearInputFile,
	onInputFileChange
}: ImagePreviewProps) {
	const [preview, setPreview] = useState('')
	console.log({ photoPreview, preview })

	useEffect(() => {
		setPreview(photoPreview)
	}, [photoPreview])

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const file = (e.target as any)?.files[0]
		handleInputFile(file)
		if (onInputFileChange) onInputFileChange(e)
	}

	const handleClear = () => {
		if (clearInputFile) clearInputFile()
		setPreview('')
	}

	const handleInputFile = (file: File) => {
		if (file) {
			const reader = new FileReader()
			reader.onload = function (e) {
				setPreview(String(e.target?.result))
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className="flex border-2 border-dashed border-green-200 p-2 min-h-[200px]">
			<input
				type="file"
				id="photo"
				name="photo"
				onChange={handleInput}
				accept="photo/*"
				className="hidden"
			/>
			{!preview ? (
				<div className="mr-auto">
					<label htmlFor="photo">Selecionar imagem</label>
				</div>
			) : (
				<div className="relative border rounded-md p-3">
					<Image
						src={preview}
						width={200}
						height={200}
						alt="Pre-visualização"
						className="object-cover aspect-square"
					/>
					<IconClose
						className="absolute top-1 right-1 bg-red-600 text-white rounded-full cursor-pointer"
						onClick={handleClear}
					/>
				</div>
			)}
		</div>
	)
}
