import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {

//     let response

//     try {
//         if (req.method === 'POST') {
//             response = await POST(req)
//         } else if (req.method === 'GET') {
//             response = await GET()
//         } else if (req.method === 'PUT') {
//             response = await PUT(req)
//         } else if (req.method === 'DELETE') {
//             response = await DELETE(req)
//         }

//         res
//             .status(200)
//             .json(response)
//     } catch (error: any) {

//         res.status(400)
//         res.json(error.message)
//     }
// }

export async function GET() {
    const breads = await prisma.bread.findMany()

    return NextResponse.json({ breads })
}

export async function POST(req: Request) {
    const body = await req.json()
    const { type, expirationMonth } = body

    await prisma.bread.create({
        data: {
            type,
            expirationMonth,
        },
    })

    return NextResponse.json({})
}

export async function PUT(req: Request) {
    const body = await req.json()
    const { id, type, expirationMonth } = body
    const updateBread = await prisma.bread.update({
        where: { id },
        data: {
            type,
            expirationMonth,
        },
    })

    return NextResponse.json({ updateBread })
}

export async function DELETE(req: Request) {
    const body = await req.json()
    const { id } = body
    const deletedBread = await prisma.bread.delete({
        where: { id },
    })

    return NextResponse.json({ deletedBread })
}