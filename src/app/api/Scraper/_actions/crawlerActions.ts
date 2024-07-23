

const getCrawlerBaseURL = (requestURl: string): string => `${process.env.CRAWLBASE_URL_BASE}/?token=${process.env.CRAWLBASE_JS_API_KEY}&format=json&pretty=true&url=${requestURl}`

export const startPageCrawler = async (requestURl: string) => {
    const url = encodeURIComponent(requestURl);

    const response = await fetch(getCrawlerBaseURL(url), {
        method: 'GET',
    });
    return await response.json()
}

