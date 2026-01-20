export type User = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

export type UserCreatePayload = {
  name: string;
  avatar: string;
};

export type UserUpdatePayload = {
  id: string;
  name: string;
  avatar: string;
};
