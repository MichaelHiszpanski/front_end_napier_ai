import { API_URL } from "../db.config";

export async function getLanguagesFetch(token?: string) {
  const res = await fetch(`${API_URL}/languages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: token } : {}),
    },
  });

  const data = await res.json();

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}
