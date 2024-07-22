import React, { useEffect } from 'react'
import { FormLogin,  } from '@/presentation/components'
import { Logo } from '@/presentation/components/layout/logoLgin'

export function Login() {
	useEffect(() => {
		document.title = 'Login - Ginásio Transformers'
	}, [])

	return (
<div className="flex flex-col sm:flex-row h-screen">
  <div className="flex justify-center items-center sm:h-full h-1/2 w-full sm:w-1/2 bg-white">
    <Logo />
  </div>
  <div className="flex justify-center items-center sm:h-full h-1/2 w-full sm:w-1/2 bg-primary">
    <FormLogin />
  </div>
</div>
	)
}
