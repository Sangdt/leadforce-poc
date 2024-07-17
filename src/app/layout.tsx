import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
// import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { BillingProvider } from "@/providers/billing-provider";
//import ReactQueryProvider from "@/providers/ReactQueryProviders/queryProvider";
// import {ReactQueryProvider} from "@/providers/reactQueryProvider";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeadForce.",
  description: "Automate Your Work With Lead force.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider
    //   publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    // >
      <html lang="en">
        <body className={font.className}>
          {/* <ReactQueryProvider> */}
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <BillingProvider>
                <ModalProvider>
                  {children}
                  <Toaster />
                </ModalProvider>
              </BillingProvider>
            </ThemeProvider>
          {/* </ReactQueryProvider> */}
        </body>
      </html>
    // </ClerkProvider>
  );
}
