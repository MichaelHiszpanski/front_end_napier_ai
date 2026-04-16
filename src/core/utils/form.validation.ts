import { UserModel } from "@/features/auth/sign_in/models/user.model";

export function formValidation(user: UserModel): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!user.name) {
    errors.name = "Name is required";
  }
  if (!user.surname) {
    errors.surname = "Surname is required";
  }
  if (user.age <= 0) {
    errors.age = "Age must be greater than 0";
  }
  return errors;
}
