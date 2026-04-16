import { getTranslationsByLanguageFetch } from "@/core/db/requests/getTranslationsByLanguage.fetch";

export async function GET(
  request: Request,
  ctx: { params: Promise<{ languageCode: string }> }
) {
  const token = request.headers.get("Authorization");
  const { languageCode } = await ctx.params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "20";

  const { ok, status, data } = await getTranslationsByLanguageFetch(
    languageCode,
    page,
    limit,
    token
  );

  if (!ok) {
    return new Response("Failed to fetch translations", { status });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
