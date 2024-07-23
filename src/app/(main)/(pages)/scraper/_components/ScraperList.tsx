"use client";

import { useEffect, useState } from "react";
import { CrawlerForm } from "./SraperForm";
import { CrawlerList } from "@/app/api/Scraper/getlist/route";
import { ScraperListTable } from "./ScraperListTable";
import { OnSentScraperRequest } from "../_actions/scraperActions";

export const ScraperList = () => {
  const [urlList, setUrlList] = useState<CrawlerList[]>([]);
  const fetchData = async () => {
    const res = await fetch("/api/Scraper/getlist");
    const data = await res.json();
    if (!!data) setUrlList(data);
  };
  const submitUrl = async (url: string) => {
    // await fetch("/api/Scraper/insert", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ requestURl: url }),
    // });
    await OnSentScraperRequest({ requestURl: url });
    await fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="m-2">
      <CrawlerForm submitUrl={submitUrl} />
      {Array.isArray(urlList) && urlList.length > 0 ? (
        <ScraperListTable UrlList={urlList} />
      ) : null}
    </div>
  );
};
