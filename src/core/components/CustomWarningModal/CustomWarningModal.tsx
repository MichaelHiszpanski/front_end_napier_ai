import { FC } from "react";

interface CustomWarningModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomWarningModal: FC<CustomWarningModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-cyan-600 p-6 w-full max-w-sm flex flex-col gap-4 shadow-lg">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="text-sm px-4 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-sm px-4 py-1.5 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomWarningModal;
