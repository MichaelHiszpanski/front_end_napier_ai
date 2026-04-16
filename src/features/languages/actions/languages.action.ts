"use server";

import { Language } from "@/core/utils/types";
import { getLanguagesApi } from "../api/languages.api";

export async function getLanguagesAction(token: string): Promise<Language[]> {
  try {
    return await getLanguagesApi(token);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}