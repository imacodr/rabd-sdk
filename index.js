const fetch = require("node-fetch");

const baseUrl = "https://hub.rabd.space";

const login = async (header) => {
  const response = await fetch(`${baseUrl}/login/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: header,
    },
  });
  return response.json();
};

const ranker = async (header, rank, groupid, userid) => {
  const response = await fetch(
    `${baseUrl}/ranker?userid=${userid}&groupid=${groupid}&rank=${rank}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: header,
      },
    }
  );
  return response.json();
};

const discordLogin = async (header, ownerId) => {
  const response = await fetch(`${baseUrl}/discord-login?ownerId=${ownerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: header,
    },
  });
  return response.json();
};

module.exports = {
  login,
  ranker,
  discordLogin,
};
