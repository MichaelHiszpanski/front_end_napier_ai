"use client";

import { FC, useEffect, useState } from "react";
import { tokenStorage } from "@/core/utils/local_storage";
import { Language } from "@/core/utils/types";
import { getLanguagesAction } from "@/features/languages/actions/languages.action";

interface Props {
  value: string;
  onChange: (code: string) => void;
}

const LanguageSelector: FC<Props> = ({ value, onChange }) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) return;

    getLanguagesAction(token)
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
      className="rounded-xl border border-cyan-600 p-2 px-6 text-black dark:text-white dark:bg-zinc-800 bg-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-sm"
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
};
export default LanguageSelector;
