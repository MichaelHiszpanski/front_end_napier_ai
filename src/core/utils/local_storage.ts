"use client";

export const AUTH_CHANGE_EVENT = "auth:change";

export function handleUnauthorized() {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  window.location.href = "/";
}

export const tokenStorage = {
  get: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },
  set: (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  },
  remove: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  },
};
