## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Layout and Responsiveness

The project uses two primary layout components — MainLayout and AdminLayout — to ensure consistent navigation and structure across public and admin pages. Each layout composes reusable UI elements such as NavBar, NavBarAdmin, Footer, and Card for modularity and maintainability.

The design follows a mobile-first approach. Layouts and components rely on CSS Flexbox and Grid to adjust naturally across common screen sizes. Responsiveness is achieved purely through CSS breakpoints without extra JavaScript logic. The main content area is constrained to a maximum width of 1280px for optimal readability on large screens.
