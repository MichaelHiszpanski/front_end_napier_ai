"use client";
import CustomInput from "@/core/components/CustomInput/CustomInput";
import SignInClient from "@/features/auth/sign_in/components/SingInClinet";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <SignInClient />
      </main>
    </div>
  );
}
