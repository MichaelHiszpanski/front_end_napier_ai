import { UserModel } from "@/features/auth/sign_in/models/user.model";

export function formValidation(user: UserModel): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!user.username) {
    errors.username = "Username is required";
  }
  if (!user.password) {
    errors.password = "Password is required";
  } else if (user.password.length < 4) {
    errors.password = "Password must be at least 5 characters";
  }
  return errors;
}
