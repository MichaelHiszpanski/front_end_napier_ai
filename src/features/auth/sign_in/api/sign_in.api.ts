const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030";

export async function singInUserApi(username: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error("Invalid credentials");
      if (res.status === 400) throw new Error("Missing fields");
      throw new Error("Login failed");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Login failed", { cause: error });
  }
}
