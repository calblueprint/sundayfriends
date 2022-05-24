# **Navigation**

React's `Stack Navigator` is used to implement navigation (see https://reactnavigation.org/docs/modal). All code for navigation can be found in `src/navigation`. Navigation follows the following structure:

- `RootNavigator`:
  - `TabNavigator`: implements `TabNavigator` for root bottom navigation bar - `HomeScreen` - `FamilyScreen` - `InventoryScreen`
  - `LoginStack`: for auth flows
    - `SigninScreen`
    - `LoginScreen`
    - `Signup1Screen`
    - `Signup2Screen`
    - `Signup3Screen`
    - `Error1Screen`
    - `Error2Screen`
  - `NotFoundScreen`
  - `ProfileScreen`
  - `ModalScreen`

where nested bullet points represent stacks or screens that are nested within a parent stack (i.e. the `LoginStack` is nested within `RootNavigator`, and the `SigninScreen` is nested within `LoginStack`).
