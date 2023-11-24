import React, { ChangeEvent, useEffect, useState } from 'react'
import { IconClose } from '.'
import { StringUtils } from '@/utils'

type ImagePreviewProps = {
	photoPreview: string
	clearInputFile?: () => void
	onInputFileChange?: (e: ChangeEvent<HTMLInputElement>) => void
	disabled?: boolean
}

export function ImagePreview({
	photoPreview,
	clearInputFile,
	onInputFileChange,
	disabled
}: ImagePreviewProps) {
	const [preview, setPreview] = useState('')
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

	const id = StringUtils.generate({ length: 3 })
	return (
		<div className="flex border-2 border-dashed border-primary border-opacity-25 p-2 min-h-[200px] min-w-[200px] max-w-[240px]">
			<input
				type="file"
				id={id}
				name="photo"
				onChange={handleInput}
				accept="image/*"
				className="hidden"
				disabled={disabled}
			/>
			{!preview ? (
				<div className="mr-auto flex w-full">
					<label
						htmlFor={id}
						className="flex-1 flex flex-col justify-center cursor-pointer text-sm text-gray-400 text-center hover:text-primary hover:bg-primary hover:bg-opacity-5 px-2"
					>
						{!disabled ? 'Selecionar imagem' : 'Fotografia'}
					</label>
				</div>
			) : (
				<div className="relative flex">
					<img
						src={preview}
						width={200}
						height={200}
						alt="Pre-visualização"
						className="shadow-md mx-auto w-full"
					/>
					{!disabled && (
						<IconClose
							className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full cursor-pointer"
							onClick={handleClear}
							title="Remover foto"
						/>
					)}
				</div>
			)}
		</div>
	)
}
