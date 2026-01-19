import React from "react";
import { Button, Form, Input, Typography, notification } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../model/useAuth";

const Page = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 720px;
  padding: 24px 16px;
`;

const Title = styled(Typography.Title)`
  && {
    margin: 0 0 12px 0;
    font-weight: 600;
  }
`;

const FormBlock = styled.div`
  width: 100%;
  max-width: 560px;
`;

const RowRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export function LoginForm(): JSX.Element {
  const [form] = Form.useForm<{ login: string; password: string }>();
  const nav = useNavigate();
  const login = useLogin();

  const onFinish = async (values: { login: string; password: string }) => {
    try {
      await login.mutateAsync(values);
      nav("/users", { replace: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Ошибка авторизации";
      notification.error({ message: "Авторизация", description: msg });
    }
  };

  return (
    <Page>
      <Wrap>
        <FormBlock>
          <Title level={5}>Авторизация</Title>

          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="login"
              rules={[{ required: true, message: "Введите логин" }]}
              style={{ marginBottom: 12 }}
            >
              <Input placeholder="Логин" size="large" autoComplete="username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Введите пароль" }]}
              style={{ marginBottom: 12 }}
            >
              <Input.Password
                placeholder="Пароль"
                size="large"
                autoComplete="current-password"
              />
            </Form.Item>

            <RowRight>
              <Button
                type="primary"
                htmlType="submit"
                loading={login.isLoading}
                disabled={login.isLoading}
              >
                Войти
              </Button>
            </RowRight>
          </Form>
        </FormBlock>
      </Wrap>
    </Page>
  );
}
