import { useEffect, useState } from "react";
import { requestBoardDetail, requestBoardList } from "../apis/apiRequests";

export const useFetch = id => {
  const [data, setData] = useState(null);
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

const INITIAL_STATE = {
  mobile: window.innerWidth <= 600,
  tablet: window.innerWidth > 600 && window.innerWidth <= 768,
  deskTop: window.innerWidth > 768
};

export const useDimensions = () => {
  const [device, setDevice] = useState(INITIAL_STATE);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      window.innerWidth <= 600
        ? setDevice({ ...INITIAL_STATE, mobile: true })
        : !device.mobile && window.innerWidth <= 768
        ? setDevice({ ...INITIAL_STATE, tablet: true })
        : setDevice({ ...INITIAL_STATE, deskTop: true });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [device]);

  return { dimensions, device };
};
