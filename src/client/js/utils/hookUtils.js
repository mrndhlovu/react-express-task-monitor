import { useEffect, useState, useRef, useContext } from "react";

import { requestBoardList } from "../apis/apiRequests";
import {
  AlertContext,
  UserContext,
  HomepageContext,
  MainContext,
  BoardContext,
} from "./contextUtils";

export const useAuth = () => useContext(UserContext);

export const useHomeContext = () => useContext(HomepageContext);
export const useBoardContext = () => useContext(BoardContext);
export const useMainContext = () => useContext(MainContext);
export const useAlert = () => useContext(AlertContext);

export const useFetch = (history) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      await requestBoardList()
        .then((res) => {
          if (isMounted) {
            setData(res.data);
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
          window.location.reload();
        });
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [history]);

  return [data, loading];
};

export const useDimensions = () => {
  const INITIAL_STATE = {
    mobile: window.innerWidth <= 600,
    tablet: window.innerWidth > 600 && window.innerWidth <= 768,
    deskTop: window.innerWidth > 768,
  };

  const [device, setDevice] = useState(INITIAL_STATE);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
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

export const useMountCallback = (isMountedCallback) => {
  const [isMounted, setMounted] = useState(false);
  return useEffect(() => {
    if (!isMounted) {
      setMounted(true);
      isMountedCallback();
    }
  }, [isMounted, setMounted, isMountedCallback]);
};

// A hook that provides the previous value for a passed prop,
// and undefined for the first time it is called.

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
