import { TranslationWithLanguage } from "@/core/utils/types";
import { FC, useEffect } from "react";
import { createPortal } from "react-dom";

interface DetailsModalProps {
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  t: TranslationWithLanguage;
}
const DetailsModal: FC<DetailsModalProps> = ({
  setShowDetails,
  showDetails,
  t,
}) => {
  useEffect(() => {
    if (showDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDetails]);

  if (!showDetails) return null;
  return (
    <>
      {showDetails &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowDetails(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="min-w-64 max-w-lg max-h-[80vh] overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                  Description
                </span>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {t.translated_value || "No description available."}
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                <span className="font-mono">{t.key}</span> · {t.language_code}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default DetailsModal;
