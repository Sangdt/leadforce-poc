import { CrawlerList } from "@/app/api/Scraper/getlist/route";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
export type ScraperListTableProps = {
  UrlList: CrawlerList[];
};
export const ScraperListTable = ({ UrlList }: ScraperListTableProps) => {
  return (
    <div className="m-2">
      <Table>
        {/* <TableHead>
          <TableRow> */}
        <TableHeader>
          <TableHead>Url</TableHead>
        </TableHeader>
        <TableBody>
          {UrlList.map((urlInfo) => (
            <TableRow key={urlInfo.id}>
              <TableCell>
                <Link href={`/scraper/${urlInfo.id}`}>{urlInfo.url}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
