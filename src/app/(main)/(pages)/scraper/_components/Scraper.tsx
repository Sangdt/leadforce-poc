
import {
  ScraperGetAllPageImage,
  ScraperGetAllPageUrl,
  ScraperSearchKeyWord,
} from "./ScraperAccordion";
export type ScraperProps = {
  id: string;
};
export const Scraper = ({ id }: ScraperProps) => {

  return (
    <>
      <ScraperSearchKeyWord id={id} />
      <ScraperGetAllPageImage id={id} />
      <ScraperGetAllPageUrl id={id} />
    </>
  );
};
