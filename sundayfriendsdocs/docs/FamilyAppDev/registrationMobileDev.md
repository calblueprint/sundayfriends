# Registration

# Head Registration and Inviting Family Members

This document goes over the Head registration flow and inviting members of the Head's family to the app.

This screen is in `Invite/InviteScreen.tsx`.

## List of Family Members

- This list uses the `MemberCard` component, which can be found in `components/MemberCard/MemberCard.tsx`
- The list displays the info of the current user--who is the Head of the family in this flow--at the top of the list, and then allows the user to add members and view and edit their current member invites.

### MemberCard

- Each `MemberCard` displays the info for a single user invite in that Family, and its parameters are the member's name, email, and status.
- Based off the inputted status--Head, Parent, or Child--the `MemberCard` will display the respective icon to indicate the member's status.
- If the member is the Head, the `MemberCard` will also display '(You)' next to the name.

## Adding Members

- When the user presses the 'Add a member' button, a bottom modal is pulled up where the user can input the information of the user they want to add.
- This bottom modal utilizes the `RBSheet` component that is imported from `react-native-raw-bottom-sheet`.
- This modal also contains the `InviteRadioButton` component that can be found in `components/InviteRadioButton/InviteRadioButton.tsx`

### RBSheet

- To modify the styling of this component, pass in the desired styling props into the `customStyles` attribute.
- This sheet is responsive to dragging and can be closed by sliding down or pressing outside the sheet.
- This sheet also closes when the user presses 'Add member.'

### Invite Radio Button

- This component is a custom radio button for the user to select the status of the member they want to invite.
- This component is found in `components/InviteRadioButton/InviteRadioButton.tsx`
- When using this component, you must pass in the `useState` function `setNewInviteStatus` so that way the selected item in the radio button saves the status chosen by the user.

### Rectangular Button

- This component is just a custom styled button that is used throughout the app.
- It takes in an `onPress` function, the button `text`, desired `buttonStyle`, and desired `textStyle`.

> Written with [StackEdit](https://stackedit.io/).
