import "@testing-library/jest-dom";

import Pagination from "../pagination";
import { render, screen, fireEvent } from "@testing-library/react";

const defaultProps = {
  currentPage: 2,
  setCurrentPage: jest.fn(),
  totalPages: 3,
};

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should disable previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
  });

  it("should disable next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
  });

  it("should call setCurrentPage when clicking a page number", () => {
    render(<Pagination {...defaultProps} />);

    const pageThreeButton = screen.getByLabelText("Page 3");
    fireEvent.click(pageThreeButton);

    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(3);
  });

  it("should render ellipsis for many pages", () => {
    render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />);

    const ellipsisElements = screen.getAllByText("...");
    expect(ellipsisElements).toHaveLength(2);
  });
});
