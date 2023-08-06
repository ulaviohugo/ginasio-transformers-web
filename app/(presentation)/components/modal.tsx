'use client'
import { ReactNode, useState } from 'react'
import { IconClose } from '.'

type ModalProps = {
  children: ReactNode
  onClose?: () => void
  show: boolean
}

export function Modal({ children, onClose, show }: ModalProps) {
  const [open, setOpen] = useState(show)
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setOpen(false)
  }
  if (!open) return <></>
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
      <div className="relative flex flex-col bg-white p-5 rounded-lg max-h-[90%] max-w-5xl">
        <button className="absolute right-2 top-2 group" onClick={handleClose}>
          <IconClose className="group-hover:scale-150 transition-all duration-100 ease-in" />
        </button>
        {children}
      </div>
    </div>
  )
}

type ModalTitleProps = {
  children: ReactNode
}

export function ModalTitle({ children }: ModalTitleProps) {
  return <div className="flex gap-1 items-center">{children}</div>
}

type ModalBodyProps = {
  children: ReactNode
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div className="overflow-auto max-h-[95%]">{children}</div>
}