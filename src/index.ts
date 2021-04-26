import fetch, { RequestInit } from "node-fetch";

const baseUrl = "https://hub.rabd.space";

type Method = "GET" | "POST";

const fetchApi = async (data: {
  token: string;
  endpoint: string;
  method?: Method;
  body?: Record<string, any>;
}) => {
  const options: RequestInit = {
    method: data.method || "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: data.token,
    },
  };

  if (data.body && data.method && data.method !== "GET") {
    options.body = JSON.stringify(data.body);
  }
  const response = await fetch(`${baseUrl}/${data.endpoint}`, options);
  return response.json();
};

const rabdSDK = {
  initialize: (tokens: {
    license?: string;
    adminToken?: string;
    botToken?: string;
  }) => {
    return {
      alive: async () => {
        try {
          return (await fetchApi({ endpoint: "", token: tokens.license || "" }))
            .alive;
        } catch (e) {
          return false;
        }
      },
      login: () => {
        if (!tokens.license) {
          throw new Error(
            "No license has been provided. They can be found on the Hub or with the !profile command using the RABD Bot."
          );
        }
        return fetchApi({ endpoint: `login`, token: tokens.license });
      },
      ranker: ({
        rank,
        groupId,
        userId,
      }: {
        rank: number;
        groupId: number;
        userId: number;
      }) => {
        if (!tokens.license) {
          throw new Error(
            "No license has been provided. They can be found on the Hub or with the !profile command using the RABD Bot."
          );
        }
        return fetchApi({
          endpoint: `ranker?userid=${userId}&groupid=${groupId}&rank=${rank}`,
          token: tokens.license || "",
        });
      },

      // ADMIN METHODS:
      discordLogin: (ownerId: string) => {
        if (!tokens.botToken) {
          throw new Error(
            "No botToken has been provided. They can only be found by RABD Administrators."
          );
        }
        return fetchApi({
          endpoint: `discord-login?ownerId=${ownerId}`,
          token: tokens.botToken,
        });
      },

      getLicenses: (robloxId: number) => {
        if (!tokens.adminToken) {
          throw new Error(
            "No adminToken has been provided. They can only be found by RABD Administrators."
          );
        }
        return fetchApi({
          endpoint: `get-licences`,
          method: "POST",
          body: {
            robloxid: robloxId,
          },
          token: tokens.adminToken,
        });
      },
      getLicense: ({
        robloxId,
        groupId,
        product,
      }: {
        robloxId: number;
        groupId: number;
        product: number;
      }) => {
        if (!tokens.adminToken) {
          throw new Error(
            "No adminToken has been provided. They can only be found by RABD Administrators."
          );
        }
        return fetchApi({
          endpoint: `get-licence`,
          method: "POST",
          body: {
            robloxid: robloxId,
            groupid: groupId,
            product: product,
          },
          token: tokens.adminToken,
        });
      },
    };
  },
};

export default rabdSDK;
