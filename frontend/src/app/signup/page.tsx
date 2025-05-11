"use client";

import AppLayout from "@/components/Layout/AppLayout";
import AuthForm from "@/components/Auth/AuthForm";

export default function SignupPage() {
  return (
    <AppLayout>
      <AuthForm mode="signup" />
    </AppLayout>
  );
}
