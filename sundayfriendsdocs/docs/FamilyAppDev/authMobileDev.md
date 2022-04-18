# **Authentication**

This guide covers the main components of the user authentication flow, including Account Activation, and Login. The current screens for this flow include:

- `SigninScreen`: starting screen for logging in and signing up
- `LoginScreen`: for existing users to login through
- `Signup1Screen`: for new users to input an invited email
- `Signup2Screen`: for new users to input a new password to login with
- `Signup3Screen`: for indicating that a new account has been successfully created
- `Error1Screen`: for indicating that an inputted email has not been invited for activation
- `Error2Screen`: for indicating that a user with the inputted email has already activated their account

### **`SigninScreen`**

This is the first screen the user sees once the app loads, and gives the user the option to authenticate. There are two buttons that bring the user to different pages:

- Log in — brings the user to the `LoginScreen`
- Activate — brings users to the first step in the Account Activation flow (`Signup1Screen`)

### **`LoginScreen`**

This is the primary login screen for existing users. It uses Firebase's simple `signInWithEmailAndPassword` to implement a email/password login. React Use Form is used to take in user input, and the `FormInput` is used to style the input boxes for the form. There are also additional buttons to navigate to the Activate Account and Password Reset flows.

### **`Signup1Screen`**

This is the first screen in the Activate Account flow, and takes in an email to be used for a new . React Use Form is used to take in user input, and the `FormInput` is used to style the input boxes for the form. On submission, `getUserInvitesByEmail` is used to check if the inputted email has been invited to have their account activated. If the `userInvites` list is of length 0 i.e. the inputted email was not invited, then the user is redirected to `Error1Screen`. Otherwise, they are redirected to `Signup2Screen`.

### **`Signup2Screen`**

This is the second screen in the Activate Account flow, and takes in a new password to be used by the user for login. React Use Form is used to take in user input, and the `FormInput` is used to style the input boxes for the form. A valid 6-character password must be submitted for the sign up to be successful. Upon submission of a valid password, `registerWithEmailAndPassword` is called to create a new Firebase auth user, and `getHeadInvitesByEmail` is used to check if the new user is a Head. If the `headInvites` list is of length 0 i.e. the user's status is not Head, then the user is redirected to the home page. Otherwise, the user is redirected to a

### **`Signup3Screen`**

This is the first screen in the Activate Account flow, and takes in an email to be used for a new . React Use Form is used to take in user input, and the `FormInput` is used to style the input boxes for the form. On submission, `getUserInvitesByEmail` is used to check if the inputted email has been invited to have their account activated. If the `headInvites` list is of length 0 i.e. the inputted email was not invited, then the user is redirected to `ErrorScreen1`.

### **`Signup3Screen`**

This is the first screen in the Activate Account flow, and takes in an email to be used for a new . React Use Form is used to take in user input, and the `FormInput` is used to style the input boxes for the form. On submission, `getUserInvitesByEmail` is used to check if the inputted email has been invited to have their account activated. If the `headInvites` list is of length 0 i.e. the inputted email was not invited, then the user is redirected to `Error1Screen`.

### **`Error1Screen`**

Users are directed here upon submission of an uninvited email address in `Signup1Screen`. Users have the option to be redirected back to `Signup1Screen`.

### **`Error2Screen`**

Users are directed here upon the attempted creation of an account that has already been activated. Users have the option to be redirected back to `Signup1Screen`.

## **Firebase Auth**

We use Google's Firebase platform to implement simple email/password authentication. We have implemented Firebase helper functions for authentication in `src/firebase/auth.ts`, including

- `signInWithEmailAndPassword`: calls Auth's `signInWithEmailAndPassword` function using a given email and password
- `registerWithEmailAndPassword`: calls Auth's `createUserWithEmailAndPassword` function using a given email and password
- `signOut`: calls Auth's `signOut` function to sign out.
