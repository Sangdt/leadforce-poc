"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { KeywordSearch } from "./KeywordSearch";
import {
  CrawlerElementSearchRes,
  CrawlerKWSearchReq,
  CrawlerSearchReq,
} from "@/app/api/Scraper/_helper/ScraperTypes";
import { use, useEffect, useState } from "react";
import {
  ImageSearchResults,
  KeywordSearchResults,
} from "./KeywordSearchResults";
import {
  OnGetElementValueRequest,
  OnSearchRequest,
} from "../_actions/scraperActions";

type Props = {
  id: string;
};

export const ScraperSearchKeyWord = ({ id }: Props) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const submitSearchRequest = async (searchRequest: CrawlerKWSearchReq) => {
    const results = await OnSearchRequest(searchRequest);
    setSearchResults(results.SearchResults);
  };
  return (
    <div className="m-2 container">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Search by keywords</AccordionTrigger>
          <AccordionContent>
            <KeywordSearch submitSearchRequest={submitSearchRequest} id={id} />
            {Array.isArray(searchResults) && searchResults.length > 0 ? (
              <KeywordSearchResults searchResults={searchResults} />
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const ScraperGetAllPageImage = ({ id }: Props) => {
  const [searchResults, setSearchResults] = useState<CrawlerElementSearchRes>({
    imgSrcs: [],
    hrefs: [],
    id: "",
  });
  const getAllPageImage = async () => {
    const searchRequest: CrawlerSearchReq = {
      id: id,
      searchType: "img",
    };
    const res = await OnGetElementValueRequest(searchRequest);
    setSearchResults(res);
    console.log(res);
  };
  useEffect(() => {
    getAllPageImage();
  }, []);
  return (
    <div className="m-2 container">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Search page Images url</AccordionTrigger>
          <AccordionContent>
            {/* <KeywordSearch submitSearchRequest={submitSearchRequest} id={id} /> */}
            {Array.isArray(searchResults?.imgSrcs) &&
            searchResults?.imgSrcs?.length > 0 ? (
              <ImageSearchResults imgResults={searchResults.imgSrcs} />
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const ScraperGetAllPageUrl = ({ id }: Props) => {
  const [searchResults, setSearchResults] = useState<CrawlerElementSearchRes>({
    imgSrcs: [],
    hrefs: [],
    id: "",
  });
  const getAllPageImage = async () => {
    const searchRequest: CrawlerSearchReq = {
      id: id,
      searchType: "href",
    };
    const res = await OnGetElementValueRequest(searchRequest);
    setSearchResults(res);
    console.log(res);
  };
  useEffect(() => {
    getAllPageImage();
  }, []);
  return (
    <div className="m-2 container">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Search page urls</AccordionTrigger>
          <AccordionContent>
            {/* <KeywordSearch submitSearchRequest={submitSearchRequest} id={id} /> */}
            {Array.isArray(searchResults?.hrefs) &&
            searchResults?.hrefs?.length > 0 ? (
              <ImageSearchResults imgResults={searchResults.hrefs} />
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
