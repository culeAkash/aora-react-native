import { AppwriteDocument } from "@/utils/types";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppwrite = (fn: any) => {
  const [data, setData] = useState<AppwriteDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fn();
      // console.log(response);

      const allData: AppwriteDocument[] = [];

      response.forEach((data: AppwriteDocument) => {
        allData.push({
          ...data,
          $id: data.$id,
          creator: data.creator,
          title: data.title,
          prompt: data.prompt,
          thumbnail: data.thumbnail,
          video: data.video,
        });
      });
      setData(allData);
    } catch (error) {
      Alert.alert("Error", (error as { message: string }).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    refetch,
  };
};
