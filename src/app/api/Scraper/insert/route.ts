import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { parse } from 'node-html-parser'
import { minify } from 'html-minifier-terser'


export type CrawlerReq = {
    requestURl: string
}
export type CrawlerRes = {
    id: string
}
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
        return new NextResponse('Error updating user in database', { status: 500 })
    }
}


const startPageCrawler = async (requestURl: string) => {
    const url = encodeURIComponent(requestURl);

    const response = await fetch(getCrawlerBaseURL(url), {
        method: 'GET',
    });
    return await response.json()
}

const getCrawlerBaseURL = (requestURl: string): string => `${process.env.CRAWLBASE_URL_BASE}/?token=${process.env.CRAWLBASE_JS_API_KEY}&format=json&pretty=true&url=${requestURl}`

const MinifHtml = async (html: string) => {
    const cleanedHTML = cleanHTML(html);
    const minifiedHTML = await minify(cleanedHTML, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true
    });

    return minifiedHTML;
}

const cleanHTML = (html: string) => {
    const root = parse(html);

    // Remove all <link> elements with rel="preload"
    root.querySelectorAll('link[rel="preload"]').forEach(link => link.remove());

    // Remove all <script> elements
    root.querySelectorAll('script').forEach(script => script.remove());

    return root.toString();
}