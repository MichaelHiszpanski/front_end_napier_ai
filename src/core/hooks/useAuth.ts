"use client";

import { useEffect, useState } from "react";
import { tokenStorage } from "@/core/utils/local_storage";

export function useAuth(): boolean {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!tokenStorage.get());
  }, []);

  return isSignedIn;
}