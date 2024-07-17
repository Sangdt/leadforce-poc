import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { parse } from 'node-html-parser'
import { minify } from 'html-minifier-terser'


export type CrawlerSearchReq = {
    id: string
    searchkeyWord: string
}

export async function POST(req: Request) {
    try {
        const body: CrawlerSearchReq = await req.json();
        const { id } = body

       
        return new NextResponse('Done', {
            status: 200,
        })
    } catch (error) {
        console.error('Error updating database:', error)
        return new NextResponse('Error updating user in database', { status: 500 })
    }
}
