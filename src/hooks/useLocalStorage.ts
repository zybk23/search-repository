import { useState, useEffect } from "react";

interface IStorageState {
  searchQuery: string;
  currentPage: number;
  sortField: string | null;
  sortOrder: "asc" | "desc";
  selectedLanguage: string;
}

const useLocalStorageObject = (key: string, initialValue: IStorageState) => {
  const [storedValue, setStoredValue] = useState<IStorageState>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const item = window.localStorage.getItem(key);
    if (item) {
      setStoredValue(JSON.parse(item));
    }
  }, [key]);

  const setValue = (
    value:
      | Partial<IStorageState>
      | ((val: IStorageState) => Partial<IStorageState>)
  ) => {
    if (typeof window === "undefined") {
      console.warn("LocalStorage kullanılabilir değil.");
      return;
    }
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    const updatedValue = { ...storedValue, ...valueToStore };
    setStoredValue(updatedValue);
    window.localStorage.setItem(key, JSON.stringify(updatedValue));
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorageObject;
