import { FormState } from "@/core/utils/types";
import { singInUserApi } from "../api/sign_in.api";

export async function singInUserAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username) {
    return { message: false, error: null, fieldErrors: { username: "Username is required" } };
  }
  if (!password) {
    return { message: false, error: null, fieldErrors: { password: "Password is required" } };
  }

  try {
    const { token } = await singInUserApi(username, password);
    return { message: true, error: null, token };
  } catch (error) {
    return { message: false, error: (error as Error).message };
  }
}
