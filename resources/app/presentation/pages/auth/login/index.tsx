import React, { useEffect } from 'react'
import { FormLogin,  } from '@/presentation/components'
import { Logo } from '@/presentation/components/layout/logoLgin'

export function Login() {
	useEffect(() => {
		document.title = 'Login - Ginásio Transformers'
	}, [])

	return (
		<div className="flex flex-col justify-center items-center h-screen relative">
  <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 bg-white flex justify-center items-center">
    <Logo className="-mb-4 z-20" />
  </div>
  <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 bg-primary flex justify-center items-center">
    <FormLogin className="z-10" />
  </div>
</div>
	)
}
