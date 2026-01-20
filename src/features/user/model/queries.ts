import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/axios";
import { User, UserCreatePayload, UserUpdatePayload } from "@/entities/user/model/types";


const USERS_KEY = ["users"];


async function fetchUsers(): Promise<User[]> {
  const res = await api.get<User[]>("/users");
  return res.data;
}

async function createUser(payload: UserCreatePayload): Promise<User> {
  const res = await api.post<User>("/users", payload);
  return res.data;
}

async function updateUser(payload: UserUpdatePayload): Promise<User> {
  const res = await api.put<User>(`/users/${payload.id}`, {
    name: payload.name,
    avatar: payload.avatar
  });
  return res.data;
}

async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}

export function useUsersQuery() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: fetchUsers
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: USERS_KEY });
    }
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: USERS_KEY });
    }
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: USERS_KEY });
    }
  });
}
