import { HydrationReactQuery } from "@/providers/ReactQueryProviders/reactQueryProvider";
import {
  LeadFinder,
  LeadResults,
  OnGetLeads,
  PageInfo,
} from "./_actions/lead-actions";

import LeadPage from "./_components/LeadsPage";

type Props = {};

const Page = async (props: Props) => {
  const leadSearch = async (query: LeadFinder) => {
    "use server";
    const res = await OnGetLeads(query);
    // console.log(res);
    return res;
  };
  const defaultLeads = await leadSearch({
    Name: "",
    pageSize: 10,
    pageIndex: 0,
  });
  return (
    // <HydrationReactQuery queryClient={queryClient}>
    <div className="flex flex-col relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Lead pages
      </h1>
      <LeadPage leadSearch={leadSearch} defaultLeads={defaultLeads} />
    </div>
    // </HydrationReactQuery>
  );
};

export default Page;
