import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export function NotFoundPage(): JSX.Element {
  const nav = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={
        <Button type="primary" onClick={() => nav("/users", { replace: true })}>
          На главную
        </Button>
      }
    />
  );
}
