"use client";

import { useEffect, useState } from "react";
import { AUTH_CHANGE_EVENT, tokenStorage } from "@/core/utils/local_storage";

export function useAuth(): boolean {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!tokenStorage.get());

    function handleAuthChange() {
      setIsSignedIn(!!tokenStorage.get());
    }

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
  }, []);

  return isSignedIn;
}