"use client";

import {
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageInfo } from "../../_actions/lead-actions";
import { TableSearchInput } from "./SearchInput";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageInfo: PageInfo;
  setPagination: (pageInfo: any) => void;
  setNameValue: (searchValue: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageInfo,
  setPagination,
  setNameValue,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    manualPagination: true,
    rowCount: pageInfo.total.valueOf(),
    data,
    columns,
    state: {
      pagination: getPagination(pageInfo),
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="m-2">
      <TableSearchInput setNameValue={setNameValue} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const getPagination = (data: PageInfo): PaginationState => {
  return {
    pageSize: data.pageSize,
    pageIndex: data.pageIndex,
  };
};