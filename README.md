# This is QA automation testing task with Cypress tool

## How to run test set:

- make sure you have installed node.js and npm on your computer
- pull the test from git repository
- use: npm run test

### Test Cases for https://www.saucedemo.com:

#### 1. Check adding items to cart as standard_user

| Action                                                                    | Data                                                     | Expected result                                                                       |
|---------------------------------------------------------------------------|----------------------------------------------------------|---------------------------------------------------------------------------------------|
| Go to https://www.saucedemo.com/                                          |                                                          | Login page opened                                                                     |
| Login as standard_user                                                    | Input Log: standard_user Pass: secret_sauce, press Login | Inventory page is shown                                                               |
| Add some item to cart                                                     | Click "add to cart" button                               | Button label of Item is changed to "Remove", on cart image there is a red sign        |
| Press on Cart button                                                      |                                                          | Cart page is shown                                                                    |
| Check that item is present with the correct price and summary             |                                                          | Item line is present with the same summary and price as on inventory page             |
| Return to inventory page                                                  | Click "continue shopping button                          | Inventory page is shown                                                               |
| Add another item to cart                                                  | Click "add to cart" button                               | Button label of Item is changed to "Remove", on cart image there is a red sign remain |
| Press on Cart button                                                      |                                                          | Cart page is shown                                                                    |
| Check that all added items are present with the correct price and summary |                                                          | Item line is present with the same summary and price as on inventory page             |
| Press "Checkout" button                                                   |                                                          | Checkout panel is shown                                                               |
| Fill in "First Name", "Last name" and "Zip/Postal Code" fields            | name/surname/code                                        | Fields are filled                                                                     |
| Press "Continue" button                                                   |                                                          | Overview page is shown with previously added items                                    |
| Check that Item total is correct                                          |                                                          | Item total equal to sum of all added items                                            | 
| Finalize basket                                                           |                                                          | Shopping complete page is shown                                                       |
| Press on burger button                                                    |                                                          | Logout button shown                                                                   |
| Press "Logout"                                                            |                                                          | Login page is shown                                                                   |

#### 2. Login as locked_user

| Action                           | Data                                                   | Expected result                        |
|----------------------------------|--------------------------------------------------------|----------------------------------------|
| Go to https://www.saucedemo.com/ |                                                        | Login page opened                      |
| Login as locked_user             | Input Log: locked_user Pass: secret_sauce, press Login | Error message shown under login button |

