import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/login/LoginPage";
import { UsersPage } from "@/pages/users/UsersPage";
import { isAuthed } from "@/shared/lib/authStorage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";

function RequireAuth(props: { children: JSX.Element }): JSX.Element {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return props.children;
}

function RequireNoAuth(props: { children: JSX.Element }): JSX.Element {
  if (isAuthed()) return <Navigate to="/users" replace />;
  return props.children;
}

export function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RequireNoAuth>
            <LoginPage />
          </RequireNoAuth>
        }
      />

      <Route
        path="/users"
        element={
          <RequireAuth>
            <UsersPage />
          </RequireAuth>
        }
      />

      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
