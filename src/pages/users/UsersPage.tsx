import React, { useMemo, useState } from "react";
import { Alert, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { clearToken } from "@/shared/lib/authStorage";
import { useUsersQuery } from "@/features/user/model/queries";
import { UsersList } from "@/features/user/ui/UsersList";
import { User } from "@/entities/user/model/types";
import { UserCreateModal } from "@/features/user/ui/UserCreateModal";
import { UserEditModal } from "@/features/user/ui/UserEditModal";

export function UsersPage(): JSX.Element {
    const nav = useNavigate();
    const { data, isLoading, isError, error } = useUsersQuery();

    const [createOpen, setCreateOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);

    const users = useMemo(() => data ?? [], [data]);

    const onLogout = () => {
        clearToken();
        notification.info({ message: "Сессия", description: "Вы вышли из аккаунта" });
        nav("/login", { replace: true });
    };

    if (isLoading) {
        return <div style={{ padding: 24 }}>Загрузка...</div>;
    }

    if (isError) {
        const msg = error instanceof Error ? error.message : "Ошибка загрузки пользователей";
        return <Alert type="error" message="Ошибка" description={msg} showIcon />;
    }

    return (
        <>
            <UsersList
                users={users}
                onLogout={onLogout}
                onCreate={() => setCreateOpen(true)}
                onEdit={(u) => setEditUser(u)}
            />
            <UserCreateModal open={createOpen} onClose={() => setCreateOpen(false)} />
            <UserEditModal open={Boolean(editUser)} user={editUser} onClose={() => setEditUser(null)} />
        </>
    );
}
