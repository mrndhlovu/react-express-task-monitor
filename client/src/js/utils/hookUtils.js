import { useEffect, useState } from "react";
import { requestBoardDetail, requestBoardList } from "../apis/apiRequests";

export const useFetch = id => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () =>
      await (id ? requestBoardDetail(id) : requestBoardList()).then(res => {
        setData(res.data);
        setLoading(false);
      });
    fetchData();
  }, [id]);

  return [data, loading];
};
