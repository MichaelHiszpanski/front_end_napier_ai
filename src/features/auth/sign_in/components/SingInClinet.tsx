"use client";

import { singInUserAction } from "../actions/sing_in.action";
import { FormSignIn } from "@/core/components/FormSignIn/FormSignIn";

export default function SignInClient() {
  return <FormSignIn onSubmit={singInUserAction} />;
}
