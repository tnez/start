import { withClerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default withClerkMiddleware((/* request: NextRequest */) => {
	return NextResponse.next()
})

export const config = {
	matcher: '/((?!.*\\.).*)',
}
