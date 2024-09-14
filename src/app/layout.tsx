import "~/styles/globals.css";

import { Inconsolata } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ColorOverlay } from "~/components/colorOverlay";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Happy Birthday, Hailey",
};

const font = Inconsolata({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
