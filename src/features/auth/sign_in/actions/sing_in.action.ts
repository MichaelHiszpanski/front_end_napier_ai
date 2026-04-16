import { FormState } from "@/core/utils/types";
import { singInUserApi } from "../api/sign_in.api";
import { formValidation } from "@/core/utils/form.validation";

export async function singInUserAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const validation = formValidation({ username, password });

  if (Object.keys(validation).length > 0) {
    return {
      message: false,
      error: "Validation failed",
      fieldErrors: validation,
    };
  }

  try {
    const { token } = await singInUserApi(username, password);
    return { message: true, error: null, token };
  } catch (error) {
    return { message: false, error: (error as Error).message };
  }
}
