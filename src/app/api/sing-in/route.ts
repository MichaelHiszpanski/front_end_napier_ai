import { signInUserFetch } from "@/core/db/requests/sign_in.fetch";
import { LoginCredentials, LoginResponse } from "@/core/utils/types";

export async function POST(request: Request) {
  try {
    const { username, password }: LoginCredentials = await request.json();

    const { ok, status, data } = await signInUserFetch(username, password);

    if (!ok) {
      if (status === 401)
        return new Response("Invalid credentials", { status: 401 });
      if (status === 400)
        return new Response("Missing fields", { status: 400 });
      return new Response("Login failed", { status: 500 });
    }

    return new Response(JSON.stringify(data as LoginResponse), {
      status: 200,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
