// import { HydrationReactQuery } from "@/providers/ReactQueryProviders/reactQueryProvider";
// import { ScraperReq } from "./_actions/scraperActions";


type Props = {};

const Page = async (props: Props) => {
//   const ScrapeUrl = async (query: ScraperReq) => {
//     "use server";
//     const res = await OnGetLeads(query);
//     // console.log(res);
//     return res;
//   };
//   const defaultLeads = await leadSearch({
//     Name: "",
//     pageSize: 10,
//     pageIndex: 0,
//   });
  return (
    // <HydrationReactQuery queryClient={queryClient}>
    <div className="flex flex-col relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Scraper pages
      </h1>
      {/* <LeadPage leadSearch={leadSearch} defaultLeads={defaultLeads} /> */}
    </div>
    // </HydrationReactQuery>
  );
};

export default Page;
