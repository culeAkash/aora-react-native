import { Models } from "react-native-appwrite";
export type CreateUserType = {
  email: string;
  password: string;
  username: string;
};

export type CreateVideoType = {
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
};

export type PostDocumentType = {
  $id: string;
  creator: string;
  title: string;
  prompt: string;
  thumbnail: string;
  video: string;
};

export interface UserModel extends Models.Document {
  $id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface VideoModel extends Models.Document {
  $id: string;
  creator: UserModel;
  title: string;
  prompt: string;
  thumbnail: string;
  video: string;
}

export interface AppwriteDocument
  extends Models.Document,
    VideoModel,
    UserModel {}
