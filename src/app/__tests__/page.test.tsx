import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Home from "../page";
import dataSlice from "../../store/repositoriesSlice";
import { RootState } from "@/store";

const mockStore = configureStore({
  reducer: {
    dataSlice: dataSlice,
  },
});

const mockDispatch = jest.fn();

jest.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => unknown) =>
    selector(mockStore.getState()),
}));

const HomeComponent = () => {
  return (
    <Provider store={mockStore}>
      <Home />
    </Provider>
  );
};

describe("Home Component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });

  it("renders the home page with initial elements", () => {
    render(<HomeComponent />);
    expect(screen.getByAltText("GitHub Logo")).toBeInTheDocument();
    expect(screen.getByText("github_explorer")).toBeInTheDocument();
  });

  it("handles language selection", async () => {
    render(<HomeComponent />);

    const pythonRadio = screen.getByLabelText("Python");
    fireEvent.click(pythonRadio);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
