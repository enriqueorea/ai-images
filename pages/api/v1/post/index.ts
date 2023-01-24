import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { Post } from "@/models";
import { IPost } from "@/interfaces/Post.interface";
import { db } from "@/database";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Data = {
  success: boolean;
  message: string;
  data?: IPost | IPost[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no existe", success: false });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const posts = await Post.find();
    await db.disconnect();

    res
      .status(200)
      .json({ message: "Posts obtenidos", success: true, data: posts });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ message: "Error al obtener posts", success: false });
  }
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { name, prompt, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = new Post({
      name,
      prompt,
      photo: photoUrl.url,
    });

    await db.connect();
    await newPost.save();
    await db.disconnect();

    res
      .status(201)
      .json({ message: "Post creado", success: true, data: newPost });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ message: "Error al crear post", success: false });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
