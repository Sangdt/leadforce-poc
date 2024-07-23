"use client"
 
import { z } from "zod"

export const crawlerFormSchema = z.object({
    requestURl: z.string().url(),
});

export const keywordSearchFormSchema = z.object({
    searchkeyWord: z.string().min(1),
    id: z.string().min(1),
});