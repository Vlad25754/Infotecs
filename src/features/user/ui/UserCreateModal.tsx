import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Space, notification } from "antd";
import { useCreateUser } from "../model/queries";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Fields = { name: string; avatar: string };

export function UserCreateModal({ open, onClose }: Props): JSX.Element {
  const [form] = Form.useForm<Fields>();
  const create = useCreateUser();
  const busy = create.isLoading;

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open, form]);

  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      await create.mutateAsync(values);
      onClose();
    } catch (e) {
      if (e && typeof e === "object" && "errorFields" in (e as any)) return;

      const msg = e instanceof Error ? e.message : "Ошибка создания пользователя";
      notification.error({ message: "Создание", description: msg });
    }
  };

  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={busy ? undefined : onClose}
      closable={!busy}
      maskClosable={!busy}
      keyboard={!busy}
      footer={
        <Space>
          <Button onClick={onClose} disabled={busy}>
            Отмена
          </Button>
          <Button type="primary" onClick={onCreate} loading={busy} disabled={busy}>
            Создать
          </Button>
        </Space>
      }
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Ссылка на аватарку"
          rules={[
            { required: true, message: "Введите ссылку на аватарку" },
            { type: "url", message: "Введите корректную ссылку (URL)" }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
