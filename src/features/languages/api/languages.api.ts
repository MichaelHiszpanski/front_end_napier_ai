import { Language } from "@/core/utils/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030";

export async function getLanguagesApi(token: string): Promise<Language[]> {
  const res = await fetch(`${API_URL}/languages`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Failed to fetch languages");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : data.data;
}