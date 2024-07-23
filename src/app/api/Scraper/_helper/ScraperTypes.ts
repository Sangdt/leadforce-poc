export type CrawlerSearchReq = {
    id: string
    searchType: string
}
export type CrawlerElementSearchRes = {
    id: string
    imgSrcs?: string[];
    hrefs: string[];
}
export type CrawlerReq = {
    requestURl: string
}
export type CrawlerRes = {
    id: string
}
export type CrawlerKWSearchReq = {
    id: string
    searchkeyWord: string
}
export type CrawlerKWSearchRes = {
    id: string
    SearchResults: string[]
}