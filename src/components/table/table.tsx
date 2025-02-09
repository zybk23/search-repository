"use client";
import { useCallback } from "react";
import Image from "next/image";
import { tableHeaders } from "@/utils/helpers";
import { IRepositoriesType } from "@/types/repositories.types";

interface ITable {
  handleSort: (field: string) => void;
  sortField: string | null;
  sortOrder: string;
  repositories: IRepositoriesType[];
}

const Table = ({ handleSort, sortField, sortOrder, repositories }: ITable) => {
  const getSortIcon = useCallback(
    (field: string) => {
      if (sortField !== field) return "/images/filter-right.png";
      return sortOrder === "desc"
        ? "/images/filter-up.png"
        : "/images/filter-down.png";
    },
    [sortField, sortOrder]
  );
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-bg-primary/90  rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-bg-secondary/90 border-b border-gray-200">
            {tableHeaders.map((item, index) => (
              <th
                key={item.title}
                className="p-4 text-left text-secondary font-semibold cursor-pointer text-sm md:text-base hover:bg-bg-secondary transition-colors"
                onClick={() => handleSort(item.sortField)}
              >
                <div className="flex items-center gap-2">
                  <span>{item.title}</span>
                  {index > 2 && (
                    <Image
                      src={getSortIcon(item.sortField)}
                      className="w-4 h-4 md:w-5 md:h-5 opacity-70"
                      alt={`Sort ${item.title}`}
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {repositories.map((repository: IRepositoriesType) => (
            <tr
              key={repository.id}
              className="border-b border-gray-100 text-left hover:bg-bg-secondary/80 transition-colors"
            >
              <td className="p-4 text-sm md:text-base text-blue font-medium">
                {repository.id}
              </td>
              <td className="p-4 text-sm md:text-base text-secondary">
                {repository?.owner?.login}
              </td>
              <td className="p-4 max-w-[200px] md:max-w-[360px] break-words text-sm md:text-base text-secondary">
                {repository.description}
              </td>
              <td className="p-4 text-sm md:text-base text-secondary">
                {repository.stargazers_count}
              </td>
              <td className="p-4 text-sm md:text-base text-secondary">
                {repository.forks_count}
              </td>
              <td className="p-4 text-sm md:text-base text-secondary">
                {repository.updated_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
