import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  title: string;
  pageDescription: string;
  children: React.ReactNode;
}

const HomePageLayout: FC<Props> = ({ children, title, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" property="og:title" content={title} />
        <meta
          name="og:description"
          property="og:description"
          content={pageDescription}
        />

        <meta property="og:image" content={"/logo"} />
      </Head>
      <header className="relative w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link href={"/"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={"/logo.svg"} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link
          className="font-inter font-medium border hover:border-[#6469ff] bg-[#6469ff] hover:bg-white hover:text-[#6469ff] text-white px-4 py-2 rounded-md  "
          href={"/createpost"}
        >
          Create
        </Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        {children}
      </main>
    </>
  );
};

export default HomePageLayout;
