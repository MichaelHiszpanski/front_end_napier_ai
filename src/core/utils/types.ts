export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type FormState = {
  message: boolean;
  error: string | null;
  fieldErrors?: Record<string, string>;
  token?: string;
};
export const initialuserValue: FormState = { message: false, error: null };
