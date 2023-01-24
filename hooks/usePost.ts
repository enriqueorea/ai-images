import imagesApi from "@/apis/imagesApi";
import { IPost } from "@/interfaces/Post.interface";
import { useQuery } from "@tanstack/react-query";

export interface IPostResponse {
  data: IPost[];
  message: string;
  success: boolean;
}

async function fetchAllPost() {
  const { data } = await imagesApi.get<IPostResponse>(`/post`);

  return data;
}

export function useFetchRepositories() {
  return useQuery(["repositories"], fetchAllPost);
}
