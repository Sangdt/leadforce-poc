import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { startPageCrawler } from '../_actions/crawlerActions'
import { MinifHtml } from '../_helper/htmlHepler'
import { CrawlerReq, CrawlerRes } from '../_helper/ScraperTypes';



export async function POST(req: Request) {
    try {
        const body: CrawlerReq = await req.json();
        const { requestURl } = body

        const crawlerResponse = await startPageCrawler(requestURl)

        crawlerResponse.body = await MinifHtml(crawlerResponse.body);
        
        const entity = await db.crawlBaseModel.upsert({
            where: { url: requestURl },
            update: {
                body: crawlerResponse.body,
            },
            create: {
                url: requestURl,
                pc_status: crawlerResponse.pc_status,
                original_status: crawlerResponse.original_status,
                body: crawlerResponse.body,
            },
        });
        const res: CrawlerRes = {
            id: entity.id
        }
        return new NextResponse(JSON.stringify(res), {
            status: 200,
        })
    } catch (error) {
        console.error('Error updating database:', error)
        return new NextResponse('Error', { status: 500 })
    }
}

