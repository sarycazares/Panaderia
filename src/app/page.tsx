'use client'
import AddBreadForm from '@/components/Bread/AddBreadForm'
import DeleteBreadForm from '@/components/Bread/DeleteBreadForm'
import EditBreadForm from '@/components/Bread/EditBreadForm'
import AppTable from '@/components/Table'
import { getBreads } from '@/services/bread'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Bread } from '@prisma/client'
import Head from 'next/head'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const step = searchParams.get('step')
    const [breadsList, setBreadsList] = useState<Bread[]>([])

    const getBreadsList = async () => {
        try {
            setBreadsList(await getBreads())
        } catch {
            setBreadsList([])
        }
    }

    useEffect(() => {
        getBreadsList()
    }, [])

    const handleClick = (stepName: string, id: number) => {
        router.push(`?step=${stepName}&id=${id}`)
    }

    return (
        <>
            <Head>
                <title>Panadería</title>
            </Head>
            <Box width="100%">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Stack direction='row' spacing={2}>
                            <Typography component="h1" fontWeight={600} variant="h4" textAlign='left'>
                                Panes
                            </Typography>
                            <IconButton
                                aria-label="Agregar"
                                color='inherit'
                                onClick={() => handleClick('add', 0)}
                            >
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                    {step ?
                        <Grid item xs={12}>
                            <Container maxWidth="xs">
                                {step == 'add' &&
                                    <AddBreadForm />
                                }
                                {step == 'edit' &&
                                    <EditBreadForm />
                                }
                                {step == 'delete' &&
                                    <DeleteBreadForm />
                                }
                            </Container>
                        </Grid>
                        :
                        <Grid item xs={12}>
                            {breadsList.length != 0 &&
                                <AppTable titleCells={['id', 'type', 'expirationMonth', '']} dataCells={breadsList} handleClickButton={handleClick} />
                            }
                        </Grid>
                    }

                </Grid>
            </Box >
        </>
    )

}
