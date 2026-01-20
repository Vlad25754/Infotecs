import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Space, notification } from "antd";
import { User } from "@/entities/user/model/types";
import { useDeleteUser, useUpdateUser } from "../model/queries";

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
};

type Fields = { id: string; name: string; avatar: string };

export function UserEditModal({ open, user, onClose }: Props): JSX.Element {
  const [form] = Form.useForm<Fields>();
  const update = useUpdateUser();
  const del = useDeleteUser();
  const busy = update.isLoading || del.isLoading;

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({ id: user.id, name: user.name, avatar: user.avatar });
    }
    if (!open) form.resetFields();
  }, [open, user, form]);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      await update.mutateAsync(values);
      onClose();
    } catch (e) {
      if (e && typeof e === "object" && "errorFields" in (e as any)) return;

      const msg = e instanceof Error ? e.message : "Ошибка сохранения пользователя";
      notification.error({ message: "Сохранение", description: msg });
    }
  };

  const onDelete = async () => {
    try {
      const { id } = await form.validateFields(["id"]);
      await del.mutateAsync(id);
      onClose();
    } catch (e) {
      if (e && typeof e === "object" && "errorFields" in (e as any)) return;

      const msg = e instanceof Error ? e.message : "Ошибка удаления пользователя";
      notification.error({ message: "Удаление", description: msg });
    }
  };

  return (
    <Modal
      title="Редактирование пользователя"
      open={open}
      onCancel={busy ? undefined : onClose}
      closable={!busy}
      maskClosable={!busy}
      keyboard={!busy}
      footer={
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Button danger onClick={onDelete} disabled={busy}>
            Удалить
          </Button>

          <Space>
            <Button onClick={onClose} disabled={busy}>
              Отмена
            </Button>
            <Button type="primary" onClick={onSave} loading={busy} disabled={busy}>
              Сохранить
            </Button>
          </Space>
        </Space>
      }
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="id" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

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
