import { IPost } from "@/interfaces/Post.interface";
import mongoose, { Model, Schema } from "mongoose";

const postSchema = new Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const PostModel: Model<IPost> =
  mongoose.models.Post || mongoose.model("Post", postSchema);

export default PostModel;
