import axios from "axios";
import { useState, useEffect } from "react";
import { useSessionStorage } from "../../hooks/storage";
import { Button } from "@mui/material";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

let auth: any = null;

//TODO
// async function getAccessToken() {
//   console.log("getAccessToken");
//   const response = await client.get("/auth/");

//   auth = response.data;
// }

// async function asyncFunc(text: string) {
//   console.log(text);
// }

export const Login1 = () => {
  const [accessToken, setAccessToken] = useSessionStorage("accessToken", "");
  const [accountId, setAccountId] = useSessionStorage("accountId", "");
  const [expiresIn, setExpiresIn] = useSessionStorage("expiresIn", "");
  const [refreshToken, setRefreshToken] = useSessionStorage("refreshToken", "");
  const [isLogged, setIsLogged] = useSessionStorage("isLogged", "");

  useEffect(() => {
    if (auth !== null) {
      console.log("auth");
      setAccessToken(auth.psnAuthorization.accessToken);
      setAccountId(auth.accountId);
      setExpiresIn(auth.psnAuthorization.expiresIn);
      setRefreshToken(auth.psnAuthorization.refreshToken);
      auth.psnAuthorization.accessToken
        ? setIsLogged("true")
        : setIsLogged("false");
    }
  }, [auth]);

  return (
    <div>
      <h2>User is not logged</h2>
      <Button
      // onClick={async () => {
      //   await getAccessToken();
      // }}
      >
        Login
      </Button>
    </div>
  );
};
