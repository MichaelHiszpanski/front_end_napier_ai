export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type TranslationKey = {
  id: number;
  key: string;
  english_value: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TranslationsResponse = PaginatedResponse<TranslationKey>;

export type Language = {
  id: number;
  code: string;
  name: string;
  is_active: boolean;
};

export type SaveTranslationRequest = {
  key: string;
  language_code: string;
  translated_value: string;
};

export type TranslationWithLanguage = {
  id: number;
  key: string;
  english_value: string;
  translated_value: string;
  language_code: string;
  language_name: string;
};

export type FormState = {
  message: boolean;
  error: string | null;
  fieldErrors?: Record<string, string>;
  token?: string;
};
export const initialuserValue: FormState = { message: false, error: null };
