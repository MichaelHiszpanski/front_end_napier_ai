import { API_URL } from "../db.config";
import {
  SaveTranslationRequest,
  TranslationWithLanguage,
  TranslationsResponse,
} from "@/core/utils/types";

export async function getTranslationsFetch(
  request: Request,
  token?: string | null
) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "20";

  const res = await fetch(
    `${API_URL}/translations?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    }
  );

  const data: TranslationsResponse = await res.json();

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}

export async function saveTranslationFetch(
  body: SaveTranslationRequest,
  token?: string | null
) {
  const res = await fetch(`${API_URL}/translations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: token } : {}),
    },
    body: JSON.stringify(body),
  });

  const data: TranslationWithLanguage = await res.json();

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}
