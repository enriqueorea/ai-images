import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

type Data = {
  message?: string;
  photo?: string | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ message: "Hello from api" });
    case "POST":
      return getImgFromDalle(req, res);
  }
}

const getImgFromDalle = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    return res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error: ${error}` });
  }
};
export const config = {
  api: {
    responseLimit: false,
  },
};
