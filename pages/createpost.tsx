import { HomePageLayout } from "@/components/layout";
import React, { useState } from "react";
import { FormField, Loader } from "@/components/ui";
import { getRandomPrompt } from "@/utils";
import imagesApi from "@/apis/imagesApi";
import { useRouter } from "next/router";

type Props = {};

const CreatePostPage = (props: Props) => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const { data } = await imagesApi.post("/dalle", {
          prompt: form.prompt,
        });
        console.log(data);
        setForm((prev) => ({
          ...prev,
          photo: `data:image/jpeg;base64,${data.photo}`,
        }));
        setGeneratingImg(false);
      } catch (error) {
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.name && form.photo) {
      setLoading(true);
      try {
        const { data } = await imagesApi.post("/post", form);
        //return to index using nextjs router

        router.push("/");
      } catch (error) {
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter your name and generate an image");
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm((prev) => ({ ...prev, prompt: randomPrompt }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <HomePageLayout
      title="Creating a post ..."
      pageDescription="Create a image with ai help"
    >
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
            Create a image with ai help and share with the world
          </p>
        </div>

        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              label={"Your name"}
              type={"text"}
              name={"name"}
              placeholder={"John Doe"}
              value={form.name}
              onChange={handleChange}
            />
            <FormField
              label={"Prompt"}
              type={"text"}
              name={"prompt"}
              placeholder={"a painting of a fox in the style of Starry Night"}
              value={form.prompt}
              onChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.photo}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/preview.png"
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}
              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg ">
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex gap-5 ">
            <button
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="button"
              onClick={generateImage}
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              Once you have create the image you want, you can share it with
              others in community
            </p>

            <button
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="submit"
            >
              {loading ? <Loader /> : "Share with the community"}
            </button>
          </div>
        </form>
      </section>
    </HomePageLayout>
  );
};

export default CreatePostPage;
