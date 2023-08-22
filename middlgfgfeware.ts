import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const token = request.headers.get('x-access-token')
	const url = request.nextUrl.pathname

	const isApiResource = url.startsWith('/api/')
	const isAuthPage = url.indexOf('/login') >= 0

	if (!isApiResource && !token && !isAuthPage) {
		const loginPage = `${request.nextUrl.origin}/login`
		return NextResponse.redirect(loginPage)
	}

	if (isApiResource && !isAuthPage) {
		if (token) {
			return NextResponse.next()
		}
		return new NextResponse(JSON.stringify({ error: 'Não autorizado' }), {
			status: 401,
			headers: { 'content-type': 'application/json' }
		})
	}
}
