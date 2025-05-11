"use client";

import AppLayout from "@/components/Layout/AppLayout";
import AuthForm from "@/components/Auth/AuthForm";

export default function LoginPage() {
  return (
    <AppLayout>
      <AuthForm mode="login" />
    </AppLayout>
  );
}
