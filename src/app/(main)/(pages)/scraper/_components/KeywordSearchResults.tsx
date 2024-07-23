// import { CrawlerList } from "@/app/api/Scraper/getlist/route";
import { CrawlerElementSearchRes } from "@/app/api/Scraper/_helper/ScraperTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export type ScraperListTableProps = {
  searchResults?: string[];
  imgResults?: string[];
};
export const KeywordSearchResults = ({
  searchResults,
}: ScraperListTableProps) => {
  return (
    <div className="m-2">
      <Table>
        {/* <TableHead>
          <TableRow> */}
        <TableHeader>
          <TableHead>Results</TableHead>
        </TableHeader>
        <TableBody>
          {searchResults.map((results, index) => (
            <TableRow key={index}>
              <TableCell>{results}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const ImageSearchResults = ({ imgResults }: ScraperListTableProps) => {
  return (
    <div className="m-2">
      <Table>
        {/* <TableHead>
            <TableRow> */}
        <TableHeader>
          <TableHead>Results</TableHead>
        </TableHeader>
        <TableBody>
          {imgResults.map((results, index) => (
            <TableRow key={index}>
              <TableCell>{results}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
