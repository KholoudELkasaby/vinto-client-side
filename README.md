---
# Vinto E-commerce Client-Side

The **Vinto E-commerce** is a powerful, feature-rich Angular application designed to deliver a seamless and modern shopping experience. It integrates tightly with the Vinto E-commerce API and provides interfaces for customers, administrators, and shipment companies.


---

##  Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

##  Features

###  Customer Features

- User authentication (Register, Login, Verify via OTP)
- Forgot and reset password
- View products with filters and search
- Add to cart, wishlist, and checkout flow
- Order history and cancel order (if in progress)
- Stripe integration for secure payments
- Profile management and password update
- Real-time notifications (status updates, confirmations)
- “Bot Not Found” & “Not Authorized” custom pages
- Skeleton loaders during data fetch

###  Admin Features

- Manage products, users, orders, and categories
- Update order status (shipped, delivered, canceled)

###  Shipment Company Dashboard

- Shipment company login and access
- Manage and track shipment assignments
- Update delivery status and confirmations

---

##  Technologies Used

- **Angular** (v19)
- **TypeScript**
- **RxJS**
- **TailwindCSS**
- **Stripe.js** (Payment integration)
- **ngx-skeleton-loader**
- **FontAwesome**
- **JWT-based Authentication**
- **REST API Integration**

---

##  Getting Started

###  Prerequisites

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

###  Installation

```bash
git clone https://github.com/Ereh11/Vinto-client-side.git
cd Vinto-client-side
npm install
```

###  Running the Application

```bash
ng serve
```

Visit: [http://localhost:4200](http://localhost:4200)

---

## 📁 Project Structure

```
Vinto-client-side/
├── public/                    # Public assets (images, logos)
├── src/
│   ├── app/
│   │   ├── components/        # Shared/reusable components
│   │   ├── models/            # Interfaces and models
│   │   ├── services/          # API & utility services
│   │   ├── guards/            # Route guards for auth, admin, etc.
│   │   ├── app.component.*    # Root component
│   │   ├── app.module.ts      # Root module
│   │   ├── app.routes.ts      # Main routes definition
│   │   ├── app.config.ts      # Configurations
│   ├── environments/          # Environment settings
│   ├── styles.css             # Global styles
│   ├── output.css             # Tailwind output (if used)
│   ├── index.html             # Main HTML file
│   └── main.ts                # Bootstrap logic
```

---

##  Environment Configuration

Modify `src/environments/environment.ts` as needed:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000/api',
  stripeKey: 'your_public_stripe_key'
};
```

---

##  Future Enhancements

- Dark mode toggle
- Admin analytics dashboard (charts, reports)
- Review and rating system
- Multi-language support
- Real-time chat for customer support

---


##  Contact

For any questions or suggestions, feel free to reach out:

📧 **Email**: [kholoudellkasaby@gmail.com](mailto:kholoudellkasaby@gmail.com)

---

## 📜 License

This project is licensed under the **MIT License**.
