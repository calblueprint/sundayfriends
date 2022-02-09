/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import SideNavbar from "./SideNavbar";

const mockPush = jest.fn();

// mock only as much as needed from next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

// mock icon component (so we can verify correct props passed in/renders properly)
jest.mock("../../../assets/Icon", () => {
  const mockedIcon = (props) => <div data-testid="icon" {...props} />;
  return mockedIcon;
});

afterEach(() => {
  cleanup();
});

describe("The SideNavbar component", () => {
  it("should contain the 4 buttons with labels", () => {
    render(<SideNavbar />);
    const navButtons = screen.getAllByRole("button");
    expect(navButtons).toHaveLength(4);
    expect(navButtons[0]).toHaveTextContent("Users");
    expect(navButtons[1]).toHaveTextContent("Admins");
    expect(navButtons[2]).toHaveTextContent("Transactions");
    expect(navButtons[3]).toHaveTextContent("Inventory");
  });

  it("should navigate to the correct routes", () => {
    render(<SideNavbar />);
    const navButtons = screen.getAllByRole("button");
    navButtons[0].click();
    expect(mockPush).toHaveBeenCalledWith("/users");
    navButtons[1].click();
    expect(mockPush).toHaveBeenCalledWith("/admins");
    navButtons[2].click();
    expect(mockPush).toHaveBeenCalledWith("/transactions");
    navButtons[3].click();
    expect(mockPush).toHaveBeenCalledWith("/inventory");
  });

  it("should render the Icon component with the correct props", () => {
    render(<SideNavbar />);
    const navIcons = screen.getAllByTestId("icon");
    expect(navIcons[0]).toHaveAttribute("type", "sundayfriendslogo");
    expect(navIcons[1]).toHaveAttribute("type", "usersnavicon");
    expect(navIcons[2]).toHaveAttribute("type", "adminnavicon");
    expect(navIcons[3]).toHaveAttribute("type", "transactionsnavicon");
  });
});
