# **Profile Screen**

## **Profile Editing**

- Modal that is shown when pressing on 'Edit Profile' on main profile screen. Once opened, the user is able to edit their name and role. This modal is constructed in `ProfielEditModal.tsx` under the components folder

**How it works**

- When the 'Edit Profile' pressable is hit on main profile screen, it sets the `editModalVisible` variable to true, which then sets visibility of the modal exported from the `ProfileEditModal.tsx` file to true and appears on the user screen
- The current user is passed into the modal as a User object state variable. Two state variables are created for each field: `name` and `role`, along with `onChangeName` and `onChangeRole` that keeps track of the user input.
- Close pressable in top right sets visibility to false and resets user fields
- Save pressable right above keyboard which calls `handleSubmit()` which saves the changes in the backend and sets visibility to false

**Helper Functions**

- `useEffect()` - effect that is dependent on the visibility of the modal so that the user, name, and role are all updated when the modal is opened and closed (visibility changes) so that the variables remain updated for each change
- `handleSubmit()` - a function that is triggered upon hitting the save button. This function calls `editUser` which is featured in the firebase `user.ts` file, which edits the users values in the backend given a `userID` and an `array` of values whose keys are equal to a field in firebase. Then, it sets the visibility of the modal to false and returns to the main profile Screen.

## **Password Reset**

- Reset password flow that goes through taking in an email, sending an email with a pin, validating the pin, setting and confirming a new password, and sending a success email.
- Each screen is treated as a new modal that is shown once the continue button is pressed as the user goes through the flow.
- All code is featured under `ProfileResetPassword.tsx` under the components folder

**How it works**

- Component takes in 3 vars: `visibile`, `setVisible`, and `user`. The functionality is similar to the Edit Profile modal where visible and setVisible is for visibility of the modal, and the user is the current logged in user.
- The main return is held through `switch(screen)`, which returns a different modal dependent on the `screen` state variable that is changed depending on where the user is in the flow. Options are 'reset', 'verify', 'setNew', and 'success', which correspond to `resetModal()`, `verifyModal()`, `setNewModal()`, and `successModal()`, all of which return a new modal for each of the possible screens.
- The user starts by entering the email connected to their account and pressing continue which sends an email containing a randomly generated 6-digit pin.
- Next, the user must type the correct pin into the input to press continue once again. Another option is to press 'resend code' which resends a regenerated pin to the user.
- Then, the user must type in their new password and confirm it, using the 4 constraints listed, and when all 4 checks pass and the passwords match, the user can press reset password, which resets the password, sends a success email to the same email and shows the final success screen

**Helper Functions**

- `reset()` - resets all the textInput for email, pin, newPW, confirmPW. Sets all state variables to false and screen back to the initial reset screen.
- `sendEmail(type)` - takes in a string `type`: 'reset' or 'success'. Generates random 6-digit pin and sets the `pin` var to it. It returns a `switch(type)` that conditions on the two possible cases and uses `emailJS.send()` to send an email. The `serviceID` and `userID` params for emailJS are contained in the .env file.
- `valid()` - switch function that is conditioned on the `screen` that is open. This helps to validate the input for each screen and returns a boolean for whether or not it passes.
  - reset screen: validates the the email inputted is valid using the `emailRegex` const.
  - verify screen: validates that the number typed is equal to the pin that was generated
  - setNew screen: validates each of the password conditions: pw match, 8-20 characters, 1 digit, 1 capital letter, no spaces
- `resetModal()` - returns the initial modal that is displayed that instructs the user to type in their email. There is a textInput that is tied to the `email` state variable so whatever the user types into the input, is set to `email`. Features a continue pressable that when pressed and is `edited && valid()`, it sets `screen` to verify (next screen), sets `Edited` to false, and sends an email to the email that was typed.
- `verifyModal()` - returns second modal that asks for the pin from the email that was sent to the user. Similar to email, the `code` var is set to what the user types in, and is checked with the `pin` that was generated when the email was sent. If they are the same (`valid()`) then the continue pressable changes color and can be pressed. When pressed, it sets `edited` to false and sets `screen` to setNew (next screen). There is also the option to resend code, which resets values to default, calls `sendEmail('reset')` again, and sets the screen back to verify to reset.
- `setNewModal()` - returns main password reset modal. Two textInputs for set pw and confirm pw. The required characteristics are at the bottom with an X or √ depending if it matches the respective requirement. The inputs are stored in `newPW` and `confirmPW`. newPW is used for each of the characteristics, and confirmPW is used to check that they match. If all required characteristics are met, then the continue button is lit up and can be pressed on, which changes the screen to 'success' and calls `sendEmail('success')` to send a confirmation success email to the user.
  - Error States: use `pwError` boolean to signify if there is an error. pwError is set to true if the user presses 'Reset Password' before it is a valid pw. Then, the textInput changes to red, and error states are displayed.
- successModal() - returns a modal that displays a success message to the user that confirms the password was reset

## **List of Components**

- ### ProfileEditModal
  - returns the Edit Profile modal and stores all functionality for profile editing
  - styles for `ProfileEditModal.tsx` are stored in `styles.tsx` under the ProfileEditModal folder under components
- ### ProfileResetModal
  - returns the reset password series of modals that has all funtctionality for resetting password.
  - styles for `ProfileResetPassword.tsx` are stored in `styles.tsx` within the ProfileResetPassword folder under components
- ### ProfileLogoutModal
  - returns the logout modal that appears when logout is pressed on the main profile screen
  - styles for `ProfileResetPassword.tsx` are stored in `styles.tsx` within the ProfileResetPassword folder under components
