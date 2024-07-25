import "@/styles/global.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import Link from "next/link";
import { BaseTemplate } from "@/templates/BaseTemplate";

export const metadata: Metadata = {
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid


  return (
    <html lang={props.params.locale}>
      <body>
        <AppRouterCacheProvider>
          <BaseTemplate
            leftNav={
              <>
                <li>
                  <Link
                    href="/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/company-overview/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    Company Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    Contacts
                  </Link>
                </li>
              </>
            }
            rightNav={
              <>
                <li>
                  <Link
                    href="/sign-in/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    Sign in
                  </Link>
                </li>
              </>
            }
          >
            <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
          </BaseTemplate>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

