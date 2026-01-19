import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthed } from "@/shared/lib/authStorage";
import { LoginForm } from "@/features/auth/ui/LoginForm";

export function LoginPage(): JSX.Element {
  const nav = useNavigate();

  useEffect(() => {
    if (isAuthed()) nav("/users", { replace: true });
  }, [nav]);

  return <LoginForm />;
}
