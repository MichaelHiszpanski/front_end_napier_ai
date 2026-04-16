"use server";

import {
  PaginatedResponse,
  SaveTranslationRequest,
  TranslationWithLanguage,
} from "@/core/utils/types";
import {
  getTranslationsByLanguageApi,
  saveTranslationApi,
} from "../api/translations.api";

export async function getTranslationsByLanguageAction(
  languageCode: string,
  page: number = 1,
  limit: number = 20,
  token: string
): Promise<PaginatedResponse<TranslationWithLanguage>> {
  try {
    return await getTranslationsByLanguageApi(languageCode, page, limit, token);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function saveTranslationAction(
  body: SaveTranslationRequest,
  token: string
): Promise<TranslationWithLanguage> {
  try {
    return await saveTranslationApi(body, token);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}