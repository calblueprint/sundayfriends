/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";
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

  it('should set open to false (closes modal) after clicking close (after information submitted)', () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={true}
        setSent={mockSetSent}
      />
    );
    const closeButton = screen.getByRole("button", {
      name: /Close/i,
    });
    closeButton.click();
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it('should set sent to false (updates modal) after clicking Invite More (after information submitted)', () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={true}
        setSent={mockSetSent}
      />
    );
    const inviteMoreButton = screen.getByRole("button", {
      name: /Invite More/i,
    });
    inviteMoreButton.click();
    expect(mockSetSent).toHaveBeenCalledWith(false);
  });

  it('should set sent to true (updates modal) after clicking Send Invites', async () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={false}
        setSent={mockSetSent}
      />
    );
    const inputName = screen.getByPlaceholderText("Firstname Lastname");
    const inputEmail = screen.getByPlaceholderText("thisisanemail@email.com");
    fireEvent.change(inputName, { target: { value: 'Dummy Name' } });
    fireEvent.change(inputEmail, { target: { value: 'sundayfriends@calblueprint.org' } });
    expect(inputName).toHaveValue("Dummy Name");
    expect(inputEmail).toHaveValue("sundayfriends@calblueprint.org");
    const sendInvitesButton = screen.getByRole("button", {
      name: /Send Invites/i,
    });
    // wrap code that changes in await act
    await act(async () => {
      sendInvitesButton.click();
    });
    expect(mockSetSent).toHaveBeenCalledWith(true);
  });

  it('should display errors when inputs are left blank', async () => {
    render(
      <InviteAdminModal
        open={true}
        setOpen={mockSetOpen}
        sent={false}
        setSent={mockSetSent}
      />
    );
    const sendInvitesButton = screen.getByRole("button", {
      name: /Send Invites/i,
    });
    await act(async () => { sendInvitesButton.click(); });
    // expect messages to exist
    const errorMessages = screen.getAllByText("Field required");
    // 2 error messages (1 for each field)
    expect(errorMessages).toHaveLength(2);
  });
});
