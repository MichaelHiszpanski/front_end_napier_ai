import { LoginCredentials, LoginResponse } from "@/core/utils/types";

const API_URL = process.env.API_URL ?? "http://localhost:3030";

export async function POST(request: Request) {
  try {
    const { username, password }: LoginCredentials = await request.json();

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      if (res.status === 401)
        return new Response("Invalid credentials", { status: 401 });
      if (res.status === 400)
        return new Response("Missing fields", { status: 400 });
      return new Response("Login failed", { status: 500 });
    }

    const data: LoginResponse = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
