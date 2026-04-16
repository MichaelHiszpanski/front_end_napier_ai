"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "../CustomInput/CustomInput";
import { FormState, initialuserValue } from "@/core/utils/types";
import { tokenStorage } from "@/core/utils/local_storage";

type SignInFormProps = {
  onSubmit: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export function FormSignIn({ onSubmit }: SignInFormProps) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(onSubmit, initialuserValue);

  useEffect(() => {
    if (state.token) {
      tokenStorage.set(state.token);
      router.push("/translations/en");
    }
  }, [state.token, router]);

  return (
    <form
      action={action}
      className="w-full max-w-sm mx-auto flex flex-col gap-5 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
      </div>

      <div className="flex flex-col gap-3">
        <CustomInput
          name="username"
          placeholder="Username"
          error={state.fieldErrors?.username || null}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          type="password"
          error={state.fieldErrors?.password || null}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-xl
          hover:bg-gray-800 active:scale-[0.98] transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Signing in…
          </span>
        ) : (
          "Sign In"
        )}
      </button>

      {state.error && (
        <p className="text-sm text-red-500 text-center bg-red-50 py-2 px-3 rounded-lg">
          {state.error}
        </p>
      )}
    </form>
  );
}
