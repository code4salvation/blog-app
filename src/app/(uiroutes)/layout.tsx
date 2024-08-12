'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Container from "@mui/material/Container";
import { BlogsProvider } from "@/context/Blogs";

const inter = Inter({ subsets: ["latin"] });

//Only for Server component
/* export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App built in NextJs with Material UI",
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BlogsProvider>
          <Header></Header>
          <Container sx={{ maxWidth: { xs: "xs", md: "xl" } }}>
            {children}
          </Container>
        </BlogsProvider>
      </body>
    </html>
  );
}
