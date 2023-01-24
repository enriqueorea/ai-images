import { HomePageLayout } from "@/components/layout";
import { FormField, Loader, RenderCards } from "@/components/ui";
import useDebounce from "@/hooks/useDebounce";
import { useFetchRepositories } from "@/hooks/usePost";
import { IPost } from "@/interfaces/Post.interface";
import { ChangeEvent, useMemo, useState } from "react";

export default function Home() {
  const { data, isLoading } = useFetchRepositories();

  const [searchText, setsearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);
  const filtered = useDebounce(searchText, 1000);

  const filteredPost = useMemo(() => {
    if (filtered) {
      const searchResult = data!.data.filter(
        (item) =>
          item.name.toLowerCase().includes(filtered.toLowerCase()) ||
          item.prompt.toLowerCase().includes(filtered.toLowerCase())
      );
      setSearchedResults(searchResult);
    }
  }, [filtered, data]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchText(e.target.value);
  };

  return (
    <HomePageLayout
      title="Home | All AI images"
      pageDescription="Enjoy the full experience of AI generator image"
    >
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
            label={"Search for a post"}
            type={"text"}
            name={"text"}
            placeholder={"Search for a post"}
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <div className="mt-10">
          {isLoading ? (
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
                  <RenderCards
                    data={searchedResults}
                    title="No search result found"
                  />
                ) : (
                  <RenderCards data={data!.data} title="No post found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </HomePageLayout>
  );
}
