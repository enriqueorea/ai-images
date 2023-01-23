import { HomePageLayout } from "@/components/layout";
import { Card, FormField, Loader } from "@/components/ui";
import { ChangeEvent, FC, useEffect, useState } from "react";

type Props = {
  data: any;
  title: string;
};

const RenderCards: FC<Props> = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post: any) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [searchText, setsearchText] = useState("abc");

  return (
    <HomePageLayout title="Home | Page" pageDescription="Home page">
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">
            Community Showcase
          </h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
            Browse trough a collection of imaginative and visually stunning
            images created by DALL-E AI
          </p>
        </div>
        <div className="mt-16">
          <FormField
            label={""}
            type={""}
            name={""}
            placeholder={""}
            value={""}
            onChange={function (e: ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing result for:{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards data={[]} title="No result found" />
                ) : (
                  <RenderCards data={[]} title="No post found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </HomePageLayout>
  );
}
