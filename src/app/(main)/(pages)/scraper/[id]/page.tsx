import { Scraper } from "../_components/Scraper";

type Props = {};

const Page = ({ params }: { params: { id: string } }) => {
  return (
    // <HydrationReactQuery queryClient={queryClient}>
    <div className="flex flex-col relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Scraper pages
      </h1>
      <Scraper id={params.id} />
    </div>
  );
};

export default Page;
