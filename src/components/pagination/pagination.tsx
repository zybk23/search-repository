"use client";
import Image from "next/image";

interface IPagination {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: IPagination) => {
  const handleClickPrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNextButton = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPageNumber = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const range = [];
    const delta = 1;

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    if (left > 2) {
      range.push(1, "...");
    } else {
      range.push(1);
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) {
      range.push("...", totalPages);
    } else {
      range.push(totalPages);
    }

    return totalPages ? (totalPages === 1 ? [1] : range) : [1];
  };

  return (
    <div className="flex items-center justify-start w-full mt-4 overflow-x-auto py-2">
      <div className="flex items-center space-x-1 md:space-x-2">
        <button
          onClick={handleClickPrevButton}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border-2 border-gray-300"
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <Image
            src="/images/left-arrow.png"
            className={`w-2 h-2 md:w-2.5 md:h-2.5 ${
              currentPage === 1 ? "opacity-50" : "opacity-100"
            }`}
            alt=""
            width={20}
            height={20}
          />
        </button>

        {getPaginationRange().map((item, index) => (
          <button
            key={index}
            onClick={() =>
              typeof item === "number" && handleClickPageNumber(item)
            }
            className={`min-w-8 h-8 md:min-w-10 md:h-10 flex items-center justify-center rounded-lg text-sm md:text-base
              ${
                currentPage === item
                  ? "bg-bg-blue text-primary"
                  : "border-2 border-gray-300"
              }
              ${typeof item !== "number" ? "border-none" : ""}`}
            disabled={typeof item !== "number"}
            aria-label={
              typeof item === "number" ? `Page ${item}` : "More pages"
            }
            aria-current={currentPage === item ? "page" : undefined}
          >
            {item}
          </button>
        ))}

        <button
          onClick={handleClickNextButton}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border-2 border-gray-300"
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <Image
            src="/images/right-arrow.png"
            className={`w-2 h-2 md:w-2.5 md:h-2.5 ${
              currentPage === totalPages ? "opacity-50" : "opacity-100"
            }`}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
