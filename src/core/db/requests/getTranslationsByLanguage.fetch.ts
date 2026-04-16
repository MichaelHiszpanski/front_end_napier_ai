import { API_URL } from "../db.config";
import { PaginatedResponse, TranslationWithLanguage } from "@/core/utils/types";

export async function getTranslationsByLanguageFetch(
  languageCode: string,
  page: string = "1",
  limit: string = "20",
  token?: string | null
) {
  const res = await fetch(
    `${API_URL}/translations/${languageCode}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    }
  );

  const data: PaginatedResponse<TranslationWithLanguage> = await res.json();

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}