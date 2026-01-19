import { useMutation } from "@tanstack/react-query";
import { loginRequest, LoginDto, LoginResponse } from "../api/login";
import { setToken } from "@/shared/lib/authStorage";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginDto>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setToken(data.token);
    }
  });
}
