import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { searchKeyword } from '../_helper/htmlHepler'
import { CrawlerKWSearchReq, CrawlerKWSearchRes } from '../_helper/ScraperTypes';



export async function POST(req: Request) {
    try {
        const body: CrawlerKWSearchReq = await req.json();
        const { id, searchkeyWord } = body
        const crawlerEntity = await db.crawlBaseModel
            .findUnique({
                where: { id },
            });
        if (!crawlerEntity || !crawlerEntity.body) {
            return new NextResponse('Not found', {
                status: 404,
            });
        }
        const results :CrawlerKWSearchRes= {
            id: crawlerEntity.id,
            SearchResults: searchKeyword(crawlerEntity.body?.valueOf(), searchkeyWord),
        }
        return new NextResponse(JSON.stringify(results), {
            status: 200,
        });
    } catch (error) {
        console.error('Error updating database:', error)
        return new NextResponse('Error crawling the request url', { status: 500 })
    }
}

