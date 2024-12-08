import { CreateUserType } from "@/utils/types";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.native.aora",
  projectId: "67549ec90014ea6297e6",
  databaseId: "6755ba620038d9a00265",
  usersCollectionId: "6755ba87002e509d7456",
  videoCollectionId: "6755bac000117fd9e3f7",
  storageId: "6755bbea0028d1f2ea62",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async ({
  email,
  password,
  username,
}: CreateUserType) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create user");

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        avatar: avatarUrl,
        username,
        email,
      }
    );

    if (!newUser) throw new Error("Failed to create user");

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const session = await account.createEmailPasswordSession(email, password);
  if (!session) throw new Error("Failed to sign in");
  return session;
};

export const getCurrentUser = async () => {
  try {
    const currentLoggedInUser = await account.get();
    if (!currentLoggedInUser) throw new Error("Failed to get user");
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentLoggedInUser.$id)]
    );
    if (!currentUser) throw new Error("Failed to get user");
    return currentUser;
  } catch (error) {
    console.log(error);
  }
};
