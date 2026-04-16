import { getLanguagesFetch } from "@/core/db/requests/getLanguages.fetch";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization") ?? undefined;

  const { ok, status, data } = await getLanguagesFetch(token);

  if (!ok) {
    return new Response("Failed to fetch languages", { status });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
