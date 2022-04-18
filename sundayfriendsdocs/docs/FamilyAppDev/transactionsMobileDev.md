# **Transactions and Filters**

## **Viewing Transactions**

- Users can view a list of their transactions. They can select whether to view their personal transactions or their entire family's.

**How it works**

- The transactions list is rendered within the TransactionsGroup component. Transactions are fetched from the backend in the useEffect hook. When the forFamily prop is true, transactions are fetched from each user in the family; otherwise, transactions are only fetched from the user.

**Helper Functions**

- getTransactionByUser, getUser, getFamilyById: self-explanatory backend functions imported for use in fetchTransactions

## **Filtering Transactions**

- In the main screen, users can filter earnings or expirations through the top button group.
- Users can also filter using the search bar. As long as any of the transactions contain the search query, it will appear.
- Clicking the "filters" button opens a modal with more options:
  - Filter by date: display transactions from the start date to the end date
  - Filter by family member (only available in Family tab): display transactions from selected family members
  - Filter by transaction type: filter earnings or expirations. Same as main screen.
- Filters stack on top of each other

**How it works**

- Filters are applied in the same useEffect hook after transactions are fetched. This is because we need to refetch all transactions anyways after a filter changes because the previous state may not contain all the transactions needed.
- The search filter currently uses Javascript's String.match() method, which checks if a string contains another string
- The filters modal was implemented using the "react-native-raw-bottom-sheet" library
- Filter by date inputs were implemented using the "react-native-modal-datetime-picker" library
- Family member filter buttons are dynamically rendered after fetching the user's family.

**Helper Functions**

- None

## **List of Components**

- ### TransactionsGroup

- The main component containing filter/search UI, the filter modal, and the transactions list. Pass in a forFamily boolean prop.

- ### TransactionPreview

- Used to render elements in the transactions list when forFamily is true. Contains a role icon in addition to other transaction data.

- ### TransactionPreviewNoIcon
- Used to render elements in the transactions list when forFamily is false. Does not contain a role icon in addition to other transaction data.

- ### FiltersModal
- The modal for filter UI. Need to pass in relevant state variables/functions as props from TransactionsGroup.

> Written with [StackEdit](https://stackedit.io/).
