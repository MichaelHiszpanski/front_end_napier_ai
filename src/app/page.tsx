"use client";
import Link from "next/link";

import SignInClient from "@/features/auth/sign_in/components/SingInClinet";
import { useAuth } from "@/core/providers/AuthProvider";

export default function Home() {
  const { isSignedIn } = useAuth();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black gap-8">
        {!isSignedIn ? (
          <SignInClient />
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              You are signed in
            </h2>
            <p className="text-sm text-zinc-500">
              Manage your i18n translations below.
            </p>
            <Link
              href="/translations/en"
              className="rounded-xl border border-cyan-600 px-6 py-2 text-sm font-medium text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors"
            >
              Go to Translations
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
