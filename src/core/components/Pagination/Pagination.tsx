import { FC } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="text-sm text-cyan-600 border border-cyan-600 rounded-xl px-4 py-1.5 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-zinc-500">
        {page} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="text-sm text-cyan-600 border border-cyan-600 rounded-xl px-4 py-1.5 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
