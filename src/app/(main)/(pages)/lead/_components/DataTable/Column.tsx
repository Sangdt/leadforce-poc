"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LeadResults } from "../../_actions/lead-actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<LeadResults>[] = [
  {
    accessorKey: "Name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "UEN",
    header: "Uen",
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: (row: any) =><ActionButton id={row.getValue()} />,
  },
];

const ActionButton = (cellValue: any) => {
  const router = useRouter();
  console.log("cellValue", cellValue);
  return (
    <div>
      <Button
        size="sm"
        onClick={(e) => router.push(`/lead/${cellValue.id}`)}
      >
        View details
      </Button>
    </div>
  );
}