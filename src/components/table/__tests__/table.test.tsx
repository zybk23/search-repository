import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../table";
import { IRepositoriesType } from "@/types/repositories.types";

describe("Table Component", () => {
  const mockRepositories: IRepositoriesType[] = [
    {
      id: 1,
      name: "test-repo",
      full_name: "test/repo",
      description: "Test Description",
      fork: false,
      forks_count: 2,
      forks: 2,
      open_issues: 0,
      watchers: 5,
      score: 1,
      created_at: "2024-01-01",
      updated_at: "2024-03-20",
    },
  ];

  const mockHandleSort = jest.fn();

  const defaultProps = {
    handleSort: mockHandleSort,
    sortField: null,
    sortOrder: "asc",
    repositories: mockRepositories,
  };

  test("renders table with correct data", () => {
    render(<Table {...defaultProps} />);
    expect(screen.getByText("Stars")).toBeInTheDocument();
    expect(screen.getByText("Forks")).toBeInTheDocument();
  });

  test("calls handleSort when clicking on sortable columns", () => {
    render(<Table {...defaultProps} />);

    fireEvent.click(screen.getByText("Stars"));
    expect(mockHandleSort).toHaveBeenCalledWith("stars");

    fireEvent.click(screen.getByText("Forks"));
    expect(mockHandleSort).toHaveBeenCalledWith("forks");
  });
});
