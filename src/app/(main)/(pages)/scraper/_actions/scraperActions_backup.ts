
export type ScraperReq = {
    url: string
}

export type ScraperKWSearchReq = {
    url: string
    keyWords: string
}
export type ScraperRes = {
    urls: string[]
}
export type ScraperImageReq = {
    src: string
    alt: string
    title: string
}

export type ScraperImageSearchRes = {
    searchResults: ScraperImageReq[]
}


const scraperBackApi = process.env.ScraperBackendAPi
export const OnSentScraperRequest = async (query: ScraperReq) => {
    const res = await fetch(`${scraperBackApi}/ScrapeUrl`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
    });
    const results: ScraperRes = await res.json();
    return results
}

export const OnGetImageUrlRequest = async (query: ScraperReq) => {
    const res = await fetch(`${scraperBackApi}/GetImage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
    });
    const results: ScraperImageSearchRes = await res.json();

    return results;
}

export const OnSearchRequest = async (query: ScraperKWSearchReq) => {
    const res = await fetch(`${scraperBackApi}/keywordSearch`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
    });
    return await res.json()
}