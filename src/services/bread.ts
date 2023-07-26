import { Bread } from '@/models/bread'
import axios from 'axios'

export const createBread = async (data: Bread) => {
    try {
        const response = await axios.post('/api/bread', data)
        return response.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const updateBread = async (data: Bread) => {
    try {
        const response = await axios.put('/api/bread', data)
        return response.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getBreads = async () => {
    try {
        const response = await axios.get('/api/bread')
        return response.data.breads
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getBread = async (id: string) => {
    try {
        const response = await axios.get('/api/bread')
        const bread = response.data.breads.find((bread: Bread) => {
            return bread.id === id
        })

        if (!bread) {
            throw new Error('Pan no encontrado')
        }

        return bread
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteBread = async (id: string) => {
    try {
        const response = await axios.delete('/api/bread', { data: { id } })
        return response.data

    } catch (error: any) {
        throw new Error(error.message)
    }
}