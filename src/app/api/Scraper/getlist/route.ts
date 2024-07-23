import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { startPageCrawler } from '../_actions/crawlerActions'
import { MinifHtml } from '../_helper/htmlHepler'
import { CrawlerReq, CrawlerRes } from '../_helper/ScraperTypes';

export type CrawlerList={
    id: string
    url: string
}

export async function GET(req: Request) {
    try {
       let results : CrawlerList[] = [];
       results = (await db.crawlBaseModel.findMany()).map((entity) => {
            return {
                id: entity.id,
                url: entity.url
            }
       });
        return new NextResponse(JSON.stringify(results), {
            status: 200,
        })
    } catch (error) {
        console.error('Error updating database:', error)
        return new NextResponse('Error', { status: 500 })
    }
}

