import {
    CrawlerElementSearchRes,
    CrawlerKWSearchReq,
    CrawlerKWSearchRes,
    CrawlerReq,
    CrawlerRes,
    CrawlerSearchReq
} from "@/app/api/Scraper/_helper/ScraperTypes";


const scraperApi = '/api/Scraper';

export const OnSentScraperRequest = async (query: CrawlerReq): Promise<CrawlerRes> => {
    const res = await fetch(`${scraperApi}/insert`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
    });
    return await res.json();
}

export const OnSearchRequest = async (query: CrawlerKWSearchReq): Promise<CrawlerKWSearchRes> => {
    const res = await fetch(`${scraperApi}/searchbykeyword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
    });
    return await res.json();
}   

export const OnGetElementValueRequest = async (query: CrawlerSearchReq): Promise<CrawlerElementSearchRes> => {
    const res = await fetch(`${scraperApi}/getelements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
    });
    return await res.json();
}   