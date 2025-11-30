import Cookies from "js-cookie";
import { apiRequest } from "./api";

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export const signIn = async (
  credentials: SignInRequest
): Promise<SignInResponse> => {
  try {
    const response = await apiRequest("/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        login: credentials.login,
        password: credentials.password,
      }),
    });

    const data = await response.json();

    Cookies.set("auth_token", data.accessToken, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });

    return data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
