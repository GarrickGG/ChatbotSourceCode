import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";
import { BOT_HELLO } from "./chat";

export interface AccessControlStore {
  hideUserApiKey: boolean;
  openaiUrl: string;
  accessCode: string;
  token: string;

  updateCode: (_: string) => void;
  enabledAccessControl: () => boolean;
  isAuthorized: () => boolean;
  fetch: () => void;
}

let fetchState = 0; // 0 not fetch, 1 fetching, 2 done

export const useAccessStore = create<AccessControlStore>()(
  persist(
    (set, get) => ({
      hideUserApiKey: false,
      openaiUrl: "/api/openai/",
      accessCode: "",
      token: "",

      updateCode(code: string) {
        set(() => ({ accessCode: code }));
      },
      enabledAccessControl() {
        useAccessStore.getState().fetch();
        const storedUser = sessionStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const isUserLoggedIn = Boolean(user);
        console.log("Stored user:", storedUser); // 检查存储的用户信息是否正确
        console.log("Parsed user:", user); // 检查解析后的用户信息是否正确
        console.log("isUserLoggedIn:", isUserLoggedIn); // 检查最终的 isUserLoggedIn 值
        return isUserLoggedIn;
      },
      isAuthorized() {
        useAccessStore.getState().fetch();

        const storedUser = sessionStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const isUserLoggedIn = Boolean(user);

        return isUserLoggedIn;
      },
      fetch() {
        if (fetchState > 0) return;
        fetchState = 1;
        fetch("/api/config", {
          method: "post",
          body: null,
        })
          .then((res) => res.json())
          .then((res: DangerConfig) => {
            console.log("[Config] got config from server", res);
            set(() => ({ ...res }));

            if ((res as any).botHello) {
              BOT_HELLO.content = (res as any).botHello;
            }
          })
          .catch(() => {
            console.error("[Config] failed to fetch config");
          })
          .finally(() => {
            fetchState = 2;
          });
      },
    }),
    {
      name: StoreKey.Access,
      version: 1,
    },
  ),
);
