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
  const [state, action] = useActionState(onSubmit, initialuserValue);

  useEffect(() => {
    if (state.token) {
      tokenStorage.set(state.token);
      router.push("/lang_selector");
    }
  }, [state.token, router]);

  return (
    <form action={action} className="flex bg-white flex-col p-4 rounded-xl">
      <CustomInput
        name={"username"}
        placeholder={"Username"}
        error={state.fieldErrors?.username || null}
      />

      <CustomInput
        name={"password"}
        placeholder={"Password"}
        type="password"
        error={state.fieldErrors?.password || null}
      />

      <button type="submit" className="text-black">
        Sign In
      </button>

      {state.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
