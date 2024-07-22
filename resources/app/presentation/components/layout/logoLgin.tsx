import React, { ImgHTMLAttributes } from 'react'

type LogoProps = ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  alt?: string;
  maxWidth?: number | string;
  maxHeight?: number | string;
};

export function Logo({
  src = '/images/logo.png',
  alt = 'Logo',
  maxWidth = '50%',
  maxHeight = 'auto',
  ...props
}: LogoProps) {
  return <img src={src} alt={alt} style={{ width: '100%', maxWidth, height: 'auto', maxHeight }} {...props} />
}
