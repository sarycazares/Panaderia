import { Bread, MONTH } from '@/models/bread'
import { getBread, updateBread } from '@/services/bread'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import exp from 'constants'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useEffect, useState } from 'react'

export default function EditBreadForm() {

    const [type, setType] = useState('')
    const [expirationMonth, setExpirationMonth] = useState(0)
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const getBreadList = async () => {
        try {
            console.log(3, id)
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
            const data: Bread = {
                id: id as string,
                type: type,
                expirationMonth: expirationMonth as MONTH
            }

            console.log(data)
            updateBread(data)
            window.location.reload()
            router.push('/')
            console.log('Se edito pan c:')
        } catch {
            console.log('Hubo un error :c')
        }

    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: 'white', borderRadius: 5 }} px={5} py={5}>
            <Stack spacing={2}>
                <Typography variant='h6' fontWeight={400} textAlign='left' sx={{ color: 'black' }}>
                    Editar Pan
                </Typography>
                <TextField
                    label="Tipo"
                    variant="outlined"
                    value={type}
                    onChange={(e) => setType(e.currentTarget.value)}
                    sx={{
                        input: {
                            backgroundColor: 'white',
                            '&:-webkit-autofill': { 'WebkitBoxShadow': 'white' }
                        }
                    }}
                />
                <TextField
                    label="Mes de expiración"
                    variant="outlined"
                    type='number'
                    value={expirationMonth}
                    onChange={(e) => setExpirationMonth(Number(e.currentTarget.value))}
                    sx={{
                        input: {
                            backgroundColor: 'white',
                            '&:-webkit-autofill': { 'WebkitBoxShadow': 'white' }
                        }
                    }}
                />
                <Stack direction='row' spacing={3}>
                    <Button variant="text" type='button' fullWidth onClick={() => router.push('/')}>Cancel</Button>
                    <Button variant="text" type='submit' fullWidth>Editar</Button>
                </Stack>

            </Stack>
        </Box>
    )
}