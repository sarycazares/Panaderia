import { MONTH } from '@/models/bread'
import { deleteBread, getBread } from '@/services/bread'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useEffect, useState } from 'react'

export default function DeleteBreadForm() {

    const [type, setType] = useState('')
    const [expirationMonth, setExpirationMonth] = useState<MONTH>()
    const router = useRouter()
    const searchParams = useSearchParams()
    let id = searchParams.get('id')

    const getBreadList = async () => {
        try {
            const bread = await getBread(id as string)
            setType(bread?.type)
            setExpirationMonth(bread?.expirationMonth)
        } catch {
            console.log('Error al asignar información')
        }
    }

    useEffect(() => {
        getBreadList()
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            deleteBread(id as string)
            window.location.reload()
            router.push('/')
            console.log('Se elimino pan c:')
        } catch {
            console.log('Hubo un error :c')
        }

    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: 'white', borderRadius: 5 }} px={5} py={5}>
            <Stack spacing={2}>
                <Typography variant='h6' fontWeight={400} textAlign='left' sx={{ color: 'black' }}>
                    Eliminar pan
                </Typography>
                <Typography variant='subtitle1' fontWeight={400} textAlign='center' sx={{ color: 'black' }}>
                    {type}
                </Typography>
                <Stack direction='row' spacing={3}>
                    <Button variant="text" type='button' fullWidth onClick={() => router.push('/')}>Cancel</Button>
                    <Button variant="text" type='submit' fullWidth>Eliminar</Button>
                </Stack>

            </Stack>
        </Box>
    )
}