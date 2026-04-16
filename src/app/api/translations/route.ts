import {
  getTranslationsFetch,
  saveTranslationFetch,
} from "@/core/db/requests/translations.fetch";
import { SaveTranslationRequest } from "@/core/utils/types";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");

  const res = await getTranslationsFetch(request, token);

  if (!res.ok) {
    return new Response("Failed to fetch translations", {
      status: res.status,
    });
  }

  return new Response(JSON.stringify(res.data), { status: 200 });
}

export async function POST(request: Request) {
  const token = request.headers.get("Authorization");
  const body: SaveTranslationRequest = await request.json();

  const res = await saveTranslationFetch(body, token);

  if (res.status === 400)
    return new Response("Missing fields", { status: 400 });
  if (res.status === 401) return new Response("Unauthorized", { status: 401 });
  if (res.status === 404)
    return new Response("Key or language not found", { status: 404 });
  if (!res.ok)
    return new Response("Failed to save translation", {
      status: res.status,
    });

  return new Response(JSON.stringify(res.data), { status: 200 });
}
