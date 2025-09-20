# System Requirements

## Functional Requirements

### Users

- It should be able to see main page with:
  - Navigation Menu
  - Newest Products
  - Products most saled
  - Footer
- It should be able to see product details.
- It should be able to add/remove items from cart
- It should be able to register account with:
  - First name, Last name, Phone number, Email and Password
- It should be able to Login
- Logged user should be able to buy a product

### Admin

- It should be able to login in administrative painel
- Admin user should be able:
  - Add/edit/remove product
  - Add/edit/remove product variant
  - Add/remove stock product variant
- Admin should be able to deny/approve order

## Non-Functional Requirements

- Min length password at least 8 with number, lower/upper case and special charactere
- Change color theme
- It can not be able to register a user with email duplicated
- If error occur on login or register, it should highlight wrong field
- It should display stock balance on product detail page
- It should be responsive to mobile devices

## Design Requirements

- It must be developed a webapp
- It must be used pnpm as package manager
- It must be used Typescript
- It must be used Tailwind
- It must be developed with NextJS
- It must be used Shadcn@2.10.0 as react component lib
- It must be used React-Hook-Form
- It must be used React-Query
- It must be used Vitests as Unit Test
- It must be used Cypress as E2E Test
- It must be used Eslint, Prettier and .config to help with code pattern
- It must be used Zustand as Global State Manager
- It must be used page router
- It must be used view-service-action
