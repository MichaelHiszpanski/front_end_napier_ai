"use client";

import { useEffect, useState } from "react";
import { tokenStorage } from "@/core/utils/local_storage";
import { Language } from "@/core/utils/types";
import { getLanguagesApi } from "@/features/languages/api/languages.api";

type Props = {
  value: string;
  onChange: (code: string) => void;
};

export default function LanguageSelector({ value, onChange }: Props) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) return;

    getLanguagesApi(token)
      .then((list) => {
        setLanguages(list);
        if (!value && list.length > 0) onChange(list[0].code);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      className="rounded-xl border border-cyan-600 p-2 px-4 text-black dark:text-white dark:bg-zinc-800 bg-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-sm"
    >
      {loading ? (
        <option>Loading…</option>
      ) : (
        languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))
      )}
    </select>
  );
}
