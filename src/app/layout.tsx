import Header from '@/components/Header'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Panadería',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Stack spacing={10}>
                    <Header />
                    <Box px={10}>
                        {children}
                    </Box>
                </Stack>
            </body>
        </html>
    )
}
