import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/sign-in*'] as const

function doesMatchPublicPath(path: string) {
	return PUBLIC_PATHS.find((x) =>
		path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))),
	)
}

function generateSignInUrl(redirectPath: string) {
	const url = new URL('/sign-in', redirectPath)
	url.searchParams.set('redirect_url', redirectPath)

	return url
}

export default withClerkMiddleware((request: NextRequest) => {
	if (doesMatchPublicPath(request.nextUrl.pathname)) {
		return NextResponse.next()
	}

	const { userId } = getAuth(request)

	if (userId === null) {
		const signInUrl = generateSignInUrl(request.url)
		return NextResponse.redirect(signInUrl)
	}

	return NextResponse.next()
})

export const config = {
	matcher: '/((?!.*\\.).*)',
}
