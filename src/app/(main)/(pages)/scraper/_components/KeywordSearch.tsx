'use client'

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { keywordSearchFormSchema } from "./formSchema";
import { CrawlerKWSearchReq } from "@/app/api/Scraper/_helper/ScraperTypes";

export type CrawlerProps = {
  submitSearchRequest: (searchRequest: CrawlerKWSearchReq) => Promise<void>;
  id: string;
};
export function KeywordSearch({ id, submitSearchRequest }: CrawlerProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof keywordSearchFormSchema>>({
    resolver: zodResolver(keywordSearchFormSchema),
    defaultValues: {
      id: id,
      searchkeyWord: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof keywordSearchFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await submitSearchRequest(values);
  }

  return (
    <div className="m-2 container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem hidden>
                <FormControl>
                  <Input placeholder="id" {...field} className="max-w-lg" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="searchkeyWord"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search crawled data</FormLabel>
                <FormControl>
                  <Input
                    placeholder="keyword to search"
                    {...field}
                    className="max-w-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
