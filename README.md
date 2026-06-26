# MoviAmiga — Frontend 🚌

**Web application that helps new users and visitors navigate Bogotá's public transport system**

> MoviAmiga gives anyone arriving in Bogotá everything they need to use the public transport system: available routes, bus stops, main portals, recharge points, and how to get and use the transport card.

---

## Related Repository

**Backend:** [BackProyectoMoviAmiga](https://github.com/arteagagarcia7/BackProyectoMoviAmiga) — Django REST Framework + PostgreSQL

---

## Features

- **Route explorer** — browse all available transport routes in the system
- **Portal guide** — locate and get information about Bogotá's main transport portals
- **Recharge points** — find where to recharge the transport card near any route
- **Bus stop locator** — view stops per route
- **Transport card guide** — step-by-step on how to get and use the Bogotá transport card
- **Trip planning** — plan trips and save favorite routes
- **Responsive design** — works on desktop and mobile

---

## Tech Stack

JavaScript · Vue.js 3 · Bootstrap · Vite · Axios

---

## How to Run

Prerequisites: Node.js 18+

> The backend must be running first. See [BackProyectoMoviAmiga](https://github.com/arteagagarcia7/BackProyectoMoviAmiga) for setup instructions.

```bash
git clone https://github.com/arteagagarcia7/Front-MoviAmiga.git
cd Front-MoviAmiga
npm install
npm run dev
```

App available at `http://localhost:5173`

**Build for production**
```bash
npm run build
```

---

## Architecture Decisions

**Vue.js 3 with Composition API**
Vue 3 was chosen for its component-based architecture, which maps naturally to the different information sections of the app (routes, portals, recharge points). Each section is an independent component consuming its own API endpoint.

**Axios for API communication**
Axios handles all HTTP requests to the Django REST backend, with a centralized base URL configuration that makes switching between development and production environments straightforward.

**Bootstrap for responsive layout**
Bootstrap was used to ensure the application works correctly on both desktop and mobile without custom CSS overhead, keeping development focused on functionality.

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── views/            # Main application screens
├── router/           # Vue Router configuration
├── assets/           # Static assets and logo
└── App.vue           # Root component
```

---

## Author

**Carlos Andrés Arteaga**
[LinkedIn](https://www.linkedin.com/in/carlos-andres-arteaga) · [GitHub](https://github.com/arteagagarcia7)

