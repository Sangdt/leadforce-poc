import { Scraper } from "./_components/Scraper";
import { ScraperList } from "./_components/ScraperList";
import { CrawlerForm } from "./_components/SraperForm";

type Props = {};

const Page = async (props: Props) => {
  return (
    // <HydrationReactQuery queryClient={queryClient}>
    <div className="flex flex-col relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Scraper pages
      </h1>
      <ScraperList />
    </div>
    // </HydrationReactQuery>
  );
};

export default Page;
