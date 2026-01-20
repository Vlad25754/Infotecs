import React from "react";
import { Avatar, Button, List, Space, Typography } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import { User } from "@/entities/user/model/types";

const Page = styled.div`
  padding: 16px 24px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const CreateBar = styled.div`
  margin-top: 16px;
`;

const Name = styled.div`
  font-weight: 600;
`;

const Meta = styled.div`
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
`;

type Props = {
  users: User[];
  onLogout: () => void;
  onCreate: () => void;
  onEdit: (user: User) => void;
};

export function UsersList(props: Props): JSX.Element {
  return (
    <Page>
      <TopBar>
        <div />
        <Button type="primary" onClick={props.onLogout}>
          Выход
        </Button>
      </TopBar>

      <List
        itemLayout="horizontal"
        dataSource={props.users}
        renderItem={(u) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={u.avatar}
                  size={40}
                  style={{ cursor: "pointer" }}
                  onClick={() => props.onEdit(u)}
                />
              }
              title={
                <span style={{ cursor: "pointer" }} onClick={() => props.onEdit(u)}>
                  <Name>{u.name}</Name>
                </span>
              }
              description={<Meta>Зарегистрирован {dayjs(u.createdAt).format("DD.MM.YYYY")}</Meta>}
            />
          </List.Item>
        )}
      />

      <CreateBar>
        <Button type="primary" onClick={props.onCreate}>
          Создать пользователя
        </Button>
      </CreateBar>
    </Page>
  );
}
