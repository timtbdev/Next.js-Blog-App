import { useEffect, useState } from "react";
import cookies from "browser-cookies";
export const useUserIp = () => {
  const [ip, setUserIp] = useState<string>("");
  useEffect(() => {
    const userIp = cookies.get("user-ip") ?? "";
    setUserIp(userIp);
  }, []);

  return ip;
};
