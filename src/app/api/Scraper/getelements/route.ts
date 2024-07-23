import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { extractAttributeValues } from '../_helper/htmlHepler'
import { CrawlerSearchReq, CrawlerElementSearchRes } from '../_helper/ScraperTypes';



export async function POST(req: Request) {
    try {
        const body: CrawlerSearchReq = await req.json();
        const { id, searchType } = body
        if (searchType !== 'img' && searchType !== 'href') {
            return new NextResponse('Invalid search type or search type not available', {
                status: 400,
            });
        }
        if (!id || id === '') {
            return new NextResponse('Invalid id', {
                status: 400,
            });
        }
        const crawlerEntity = await db.crawlBaseModel
            .findUnique({
                where: { id },
            });
        if (!crawlerEntity || !crawlerEntity.body) {
            return new NextResponse('Not found', {
                status: 404,
            });
        }

        let results: CrawlerElementSearchRes = {
            id: crawlerEntity.id,
            imgSrcs: new Array<string>(),
            hrefs: new Array<string>(),
        }
        if (searchType === 'img') {
            results.imgSrcs = extractAttributeValues(crawlerEntity.body?.valueOf(), 'img', 'src', true);
        }

        if (searchType === 'href') {
            results.hrefs = extractAttributeValues(crawlerEntity.body?.valueOf(), 'a', 'href', true);
        }
        return new NextResponse<CrawlerElementSearchRes>(JSON.stringify(results), {
            status: 200,
        });
    } catch (error) {
        console.error('Error updating database:', error)
        return new NextResponse('Error updating user in database', { status: 500 })
    }
}

