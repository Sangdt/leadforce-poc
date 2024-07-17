import { OnGetLeadsByID } from "../_actions/lead-actions";
import { redirect } from "next/navigation";
import { LeadDetail } from "../_components/Details/LeadDetail";

type Props = {};

const Page = async ({ params }: { params: { leadid: string } }) => {
  // console.log("params", params);
  const leadDetail = await OnGetLeadsByID(params.leadid);
  if (!leadDetail) {
    redirect("/404");
  }
  return (
    <div className="flex flex-col relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Lead Details pages
      </h1>
      <LeadDetail leadInfo={leadDetail} />
    </div>
  );
};

export default Page;
