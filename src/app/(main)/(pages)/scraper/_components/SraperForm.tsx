"use client";

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
import { crawlerFormSchema } from "./formSchema";
export type CrawlerProps = {
  submitUrl: (response: string) => Promise<void>;
};
// const submitUrl = async (url: string) => {

// }
export function CrawlerForm({ submitUrl }: CrawlerProps
) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof crawlerFormSchema>>({
    resolver: zodResolver(crawlerFormSchema),
    defaultValues: {
      requestURl: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof crawlerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await submitUrl(values.requestURl);
  }

  return (
    <div className="m-2 container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="requestURl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Submit uri</FormLabel>
                <FormControl>
                  <Input
                    placeholder="url to search"
                    {...field}
                    className="max-w-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
