/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { InviteAdminModal } from "./InviteAdminModal";

const mockSetOpen = jest.fn();
const mockSetSent = jest.fn();

afterEach(() => {
  mockSetOpen.mockReset();
  mockSetSent.mockReset();
  cleanup();
});

describe("The InviteAdminModal component", () => {
  // EXAMPLE TEST
  it("should have a heading of INVITE ADMINS", () => {
    // renders the component we want to test
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={false}
        setSent={mockSetSent}
      />
    );
    // search for the element/component we want to verify (in this case it's a heading)
    const modalHeading = screen.getByRole("heading");
    // verify that the heading displays INVITE ADMINS, the expected test
    // FOR FUN: make this test fail! (but please do not push, just do it for learning purposes)
    expect(modalHeading.textContent).toEqual("INVITE ADMINS");
  });

  // Unit Tests for Component
  it("should set open to false (closes modal) after clicking Cancel", () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={false}
        setSent={mockSetSent}
      />
    );
    const cancelButton = screen.getByRole("button", {
      name: /Cancel/i,
    });
    cancelButton.click();
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("should set open to false (closes modal) after clicking X", () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={false}
        setSent={mockSetSent}
      />
    );
    const closeButton = screen.getAllByRole("button")[0];
    closeButton.click();
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("should add an invitation after clicking New Invitation", () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={false}
        setSent={mockSetSent}
      />
    );
    const initialFields = screen.getAllByRole("textbox");
    expect(initialFields).toHaveLength(2);
    const addInvite = screen.getByRole("button", {
      name: /New Invitation/i,
    });
    addInvite.click();
    const updatedFields = screen.getAllByRole("textbox");
    expect(updatedFields).toHaveLength(4);
  });

  it("should limit the number of invitations to 5 and hide add button", () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={false}
        setSent={mockSetSent}
      />
    );
    const addInvite = screen.getByRole("button", {
      name: /New Invitation/i,
    });
    // click 4 times
    for (let i = 0; i < 4; ++i) {
      addInvite.click();
    }
    // make sure there are 5 fields
    expect(screen.getAllByRole("textbox")).toHaveLength(10);
    // make sure add invite button no longer exists
    expect(
      screen.queryByRole("button", {
        name: /New Invitation/i,
      })
    ).toBeNull();
  });

  it("should delete fields after clicking the trash icon", () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={false}
        setSent={mockSetSent}
      />
    );
    const addInvite = screen.getByRole("button", {
      name: /New Invitation/i,
    });
    addInvite.click();
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
    const removeInviteButton = screen.getAllByRole("button")[1];
    removeInviteButton.click();
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  // TODO check for error states in tests and API calls with emailjs
});
