import { Option } from "@/components/ui/multiple-selector";
import { db } from "@/lib/db";
import { CompanyInfo } from "@prisma/client";
import exp from "constants";

export type PageInfo = {
  pageSize: number;
  pageIndex: number;
  total: Number;
};

export type LeadFinder = {
  Name: string;
  //uen: string;
  pageSize: number;
  pageIndex: number;
};

export type LeadResults = CompanyInfo & PageInfo;

export const OnGetLeads = async (searchQuery: LeadFinder) => {
  if (!searchQuery.Name) {
    const count = await db.companyInfo.count();
    const res = await db.companyInfo.findMany({
      take: searchQuery.pageSize,
      skip: searchQuery.pageIndex * searchQuery.pageSize,
    });
    return res.map((lead): LeadResults => {
      return {
        ...lead,
        total: count,
        pageSize: searchQuery.pageSize,
        pageIndex: searchQuery.pageIndex,
      };
    });
  }
  const count = await db.companyInfo.count({
    where: {
      Name: { contains: searchQuery.Name, mode: "insensitive" },
    },
  });
  const leads = await db.companyInfo.findMany({
    where: {
      Name: {
        contains: searchQuery.Name,
        mode: "insensitive",
      },
    },
    take: searchQuery.pageSize,
    skip: searchQuery.pageIndex * searchQuery.pageSize,
  });
  if (leads.length > 0) {
    return leads.map((lead): LeadResults => {
      return {
        ...lead,
        total: count,
        pageSize: searchQuery.pageSize,
        pageIndex: searchQuery.pageIndex,
      };
    });
  }
  return new Array<LeadResults>();
};

export const OnGetLeadsByID = async (id: string) => {
  if (!id) {
    return null;
  }
  const lead = await db.companyInfo.findFirst({
    where: {
      id: id,
    },
  });
  return lead;
};
