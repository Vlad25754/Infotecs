import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { clearToken } from "@/shared/lib/authStorage";

export function UsersPage(): JSX.Element {
  const nav = useNavigate();

  const logout = () => {
    clearToken();
    nav("/login", { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        Пользователи
      </Typography.Title>
      <Button onClick={logout}>Выход</Button>
    </div>
  );
}
