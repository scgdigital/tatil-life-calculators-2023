import { CalculatorsLayout } from "@/components/CalculatorsLayout";
import { Roboto } from "next/font/google";
import "./globals.css";

import { cx } from "class-variance-authority";
import { Providers } from "@/store/provider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Tatil - Life Calculators",
  description: "Life Insurance for our client needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(roboto.className)}>
        <Providers>
          <CalculatorsLayout>{children}</CalculatorsLayout>
        </Providers>
      </body>
    </html>
  );
}
