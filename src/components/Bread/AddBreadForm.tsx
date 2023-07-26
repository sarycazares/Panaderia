import { Bread } from '@/models/bread'
import { createBread } from '@/services/bread'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useState } from 'react'

export default function AddBreadForm() {
    const [type, setType] = useState('')
    const [expirationMonth, setExpirationMonth] = useState(0)
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const data: Bread = {
                type: type,
                expirationMonth: expirationMonth
            }
            createBread(data)
            console.log('Se agregó pan c:')
            window.location.reload()
            router.push('/')
        } catch {
            console.log('Hubo un error :c')
        }

    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: 'white', borderRadius: 5 }} px={5} py={5}>
            <Stack spacing={2}>
                <Typography variant='h6' fontWeight={400} textAlign='left' sx={{ color: 'black' }}>
                    Agregar Pan
                </Typography>
                <TextField
                    label="Tipo"
                    variant="outlined"
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
                    <Button variant="text" type='submit' fullWidth>Agregar</Button>
                </Stack>

            </Stack>
        </Box>
    )
}