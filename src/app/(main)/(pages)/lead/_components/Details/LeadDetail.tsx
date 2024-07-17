"use client"
import { CompanyInfo } from "@prisma/client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardSecondaryTitle,
  CardTitle,
  CardTitleSmall,
} from "./_components/LeadCardDetails";

interface LeadDetail {
  leadInfo: CompanyInfo;
}

const LeadDetail = ({ leadInfo }: LeadDetail) => {
  let [hovered, setHoveredState] = useState<Boolean>(false);

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 py-10")}
      onMouseEnter={() => setHoveredState(true)}
      onMouseLeave={() => setHoveredState(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <Card>
        <CardTitle>{leadInfo.Name}</CardTitle>
        <CardSecondaryTitle>{leadInfo.UEN}</CardSecondaryTitle>
        <CardTitleSmall>{leadInfo.Founded}</CardTitleSmall>
        <CardDescription>{leadInfo.Location}</CardDescription>
      </Card>
    </div>
  );
};

export {LeadDetail}