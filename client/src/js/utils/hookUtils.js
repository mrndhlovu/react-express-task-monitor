import { useEffect, useState, useRef } from "react";

import { requestBoardList, userInfo } from "../apis/apiRequests";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { hash } = window.location;
  const onLoginOrSignupPage = hash === "#/signup" || hash === "#/login";

  useEffect(() => {
    if (onLoginOrSignupPage) return;

    setLoading(true);
    const fetchData = async () =>
      await userInfo().then(
        res => {
          setAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        },
        error => {
          setLoading(false);
        }
      );

    fetchData();
  }, [onLoginOrSignupPage]);

  return [authenticated, user, loading];
};

export const useRenderCount = () => {
  const [renderCount, setRenderCount] = useState(0);

  let count = 0;
  useEffect(() => {
    count++;
    setRenderCount(count);
  }, [renderCount, count]);

  return renderCount;
};

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await requestBoardList()
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return [data, loading];
};

export const useSocket = location => {};

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

export const useMountCallback = isMountedCallback => {
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
// From https://stackoverflow.com/a/53446665
export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
