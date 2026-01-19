import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type LoginDto = { login: string; password: string };
export type LoginResponse = { token: string };
type Test = {[key:string]: string};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginRequest(dto: LoginDto): Promise<LoginResponse> {
  const config: AxiosRequestConfig = {
    url: "/login",
    method: "POST",
    data: dto,
    adapter: async (cfg): Promise<AxiosResponse<LoginResponse>> => {
      await delay(2000);

      const body = (JSON.parse(cfg.data) as LoginDto || {});
      
      const ok = body.login === "admin" && body.password === "admin";
      if (!ok) {
        throw new Error("Неверный логин или пароль");
      }

      return {
        data: { token: "qejee3iuhjoe9323k2endn" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: cfg
      };
    }
  };

  const res = await axios.request<LoginResponse>(config);
  return res.data;
}
