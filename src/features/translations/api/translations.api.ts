import {
  PaginatedResponse,
  SaveTranslationRequest,
  TranslationWithLanguage,
} from "@/core/utils/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030";

export async function getTranslationsByLanguageApi(
  languageCode: string,
  page: number = 1,
  limit: number = 20,
  token: string
): Promise<PaginatedResponse<TranslationWithLanguage>> {
  const res = await fetch(
    `${API_URL}/translations/${languageCode}?page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Failed to fetch translations");
  }

  return res.json();
}

export async function saveTranslationApi(
  body: SaveTranslationRequest,
  token: string
): Promise<TranslationWithLanguage> {
  const res = await fetch(`${API_URL}/translations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    if (res.status === 400) throw new Error("Missing fields");
    if (res.status === 404) throw new Error("Key or language not found");
    throw new Error("Failed to save translation");
  }

  return res.json();
}