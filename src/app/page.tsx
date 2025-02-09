"use client";
import { useEffect, useCallback, CSSProperties, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import useLocalStorageObject from "@/hooks/useLocalStorage";
import { languages } from "@/utils/helpers";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getRepositories } from "@/store/repositoriesSlice";
import Image from "next/image";
import { Container, Pagination, Table } from "@/components";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#0EA5E9",
};

const Home = () => {
  const dispatch = useAppDispatch();
  const repositories = useAppSelector((state) => state.dataSlice.repositories);
  const [localStorageState, setLocalStorageState] = useLocalStorageObject(
    "repositoryState",
    {
      searchQuery: "",
      currentPage: 1,
      sortField: null,
      sortOrder: "asc",
      selectedLanguage: "Javascript",
    }
  );

  const { searchQuery, currentPage, sortField, sortOrder, selectedLanguage } =
    localStorageState;
  const itemsPerPage = 10;

  const debouncedSearch = useDebounce(searchQuery, 500);

  const totalResults = useAppSelector((state) => state.dataSlice.totalResults);
  const isLoading = useAppSelector((state) => state.dataSlice.isLoading);

  const isFirstRun = useRef(true);

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalStorageState({ selectedLanguage: e.target.value });
    },
    [setLocalStorageState]
  );

  const handleSort = useCallback(
    (field: string) => {
      if (sortField === field) {
        setLocalStorageState({
          sortOrder: sortOrder === "asc" ? "desc" : "asc",
        });
      } else {
        setLocalStorageState({ sortField: field, sortOrder: "asc" });
      }
    },
    [sortField, sortOrder, setLocalStorageState]
  );

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const sortQuery = sortField ? `&sort=${sortField}&order=${sortOrder}` : "";
    dispatch(
      getRepositories({
        searchQuery: debouncedSearch,
        selectedLanguage,
        currentPage,
        sortQuery,
      })
    );
  }, [
    debouncedSearch,
    dispatch,
    selectedLanguage,
    currentPage,
    sortField,
    sortOrder,
  ]);

  const renderTable = () => {
    if (isLoading) {
      return (
        <ClipLoader
          color={"#0EA5E9"}
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      );
    }

    return repositories.length > 0 ? (
      <div className="overflow-x-auto">
        <Table
          handleSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          repositories={repositories}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={(newPage) =>
            setLocalStorageState({ currentPage: newPage })
          }
          totalPages={Math.ceil(Number(totalResults) / itemsPerPage)}
        />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-2xl border border-red-200">
        <span className="text-xl md:text-2xl font-semibold text-red-700 text-center">
          No repositories found
        </span>
        <p className="mt-2 text-red-600 text-center">
          Please try adjusting your search criteria
        </p>
      </div>
    );
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Container>
        <div className="flex flex-col gap-8 p-4 md:p-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/github.png"
              width={120}
              height={120}
              alt="GitHub Logo"
              className="w-16 h-16 md:w-[120px] md:h-[120px]"
            />
            <span className="text-xl md:text-3xl">github_explorer</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {languages.map((language) => (
              <label key={language.id} className="flex items-center">
                <input
                  type="radio"
                  value={language.name}
                  checked={selectedLanguage === language.name}
                  onChange={handleLanguageChange}
                  className="custom-radio mr-1"
                />
                <span className="text-base md:text-xl font-normal">
                  {language.name}
                </span>
              </label>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search repositories..."
              className="flex-1 p-3 md:p-4 rounded-2xl border border-gray-300 text-base md:text-lg outline-none"
              value={searchQuery}
              onChange={(e) =>
                setLocalStorageState({ searchQuery: e.target.value })
              }
            />
          </div>
          {renderTable()}
        </div>
      </Container>
    </div>
  );
};

export default Home;
