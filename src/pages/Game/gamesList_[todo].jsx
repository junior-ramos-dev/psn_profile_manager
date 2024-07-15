import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSessionStorage } from "../utils/storage";
//TODO
axios.defaults.headers.common["Authorization"] =
  `Bearer ${sessionStorage.getItem("accessToken")}`;

const client = axios.create({
  // baseURL: "http://localhost:3000",
});

export function GamesList() {
  const [data, setData] = useState([]);
  const [accessToken, _] = useSessionStorage("accessToken");
  const [accountId, __] = useSessionStorage("accountId");

  useEffect(() => {
    async function getGamesList() {
      const response = await client.get("/games/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          AccountId: `${accountId}`,
        },
      });
      setData(response.data);
    }
    getGamesList();
  }, []);

  if (!data) return <h3>No post!</h3>;

  return (
    <div>
      <h3>Total {data.length}</h3>
      <ul>
        {data.map((game) => (
          <li>{game.trophyTitleName}</li>
        ))}
      </ul>
    </div>
  );
}
