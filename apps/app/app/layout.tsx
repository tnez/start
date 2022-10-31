import * as React from 'react'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<head>
					<title>Create Next App</title>
					<meta name="description" content="Generated by create next app" />
					<link rel="icon" href="/favicon.ico" />
				</head>
				<body>{children}</body>
			</html>
		</ClerkProvider>
	)
}
