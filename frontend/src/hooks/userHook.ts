import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfo } from "../types/userInfo";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (await apiClient.post<UserInfo>(`api/signin`, { email, password })).data,
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (await apiClient.post<UserInfo>(`api/signup`, { name, email, password }))
        .data,
  });
