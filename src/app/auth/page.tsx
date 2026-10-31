import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in or sign up — Shtirblitz",
  description: "Sign in or create a Shtirblitz account. Make your next move.",
};

export default function AuthPage() {
  return <AuthForm />;
}
