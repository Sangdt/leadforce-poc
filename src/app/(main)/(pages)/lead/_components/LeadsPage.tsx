"use client";
import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
import {
  LeadFinder,
  LeadResults,
  OnGetLeads,
  PageInfo,
} from "../_actions/lead-actions";
import { DataTable } from "./DataTable";
import { columns } from "./DataTable/Column";
import { use, useCallback, useEffect, useState } from "react";
import { set } from "zod";
import { PaginationState } from "@tanstack/react-table";

interface LeadPageProps {
  defaultLeads: LeadResults[];
  leadSearch: (query: LeadFinder) => Promise<LeadResults[]>;
}

const LeadPage = ({ defaultLeads, leadSearch }: LeadPageProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [leads, setLeads] = useState<LeadResults[]>(defaultLeads);
  const [query, setQuery] = useState<LeadFinder>({
    Name: "",
    pageSize: 10,
    pageIndex: 1,
  });
  const paginationUpdate = () => {
    setQuery({
      ...query,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
  };
  const setNameValue = (searchValue: string) => {
    setQuery({
      pageSize: 10,
      pageIndex: 0,
      Name: searchValue,
    });
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
  };

  const getSearchReults = async () => {
    const results = await leadSearch(query);
    setLeads(results);
  };
  useEffect(() => {
    paginationUpdate();
  }, [pagination]);

  useEffect(() => {

    getSearchReults();
  }, [query]);

  if (leads) {
    return (
      <DataTable
        pageInfo={getPaganationData(leads)}
        columns={columns}
        data={leads}
        setNameValue={setNameValue}
        setPagination={setPagination}
      />
    );
  }
};
const getPaganationData = (data: LeadResults[]): PageInfo => {
  return {
    pageSize: data[0].pageSize,
    pageIndex: data[0].pageIndex,
    total: data[0].total,
  };
};
export default LeadPage;
