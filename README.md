# Star Wars Character App

A modern, sleek React application for browsing Star Wars characters using the SWAPI, built with React, Vite, Tailwind CSS, and Framer Motion for smooth animated interactions.

## Overview

This project is a polished frontend demo that lets users browse Star Wars characters with pagination, view detailed character information in a modal, and search and filter by homeworld, species, and films. The app focuses on smooth animation, good perceived performance, and a clean responsive layout.

## Features

- Character listing with pagination
- Character details shown in a modal
- Real-time search and filter by homeworld, species, and films
- Mock authentication with JWT-style tokens
- Responsive design for mobile, tablet, and desktop
- Framer Motion powered animations
- Component-level skeleton loaders for better perceived performance

## Tech stack

- React 19.1.1
- Vite 7.1.7
- Tailwind CSS 4.1.17
- Framer Motion 12.23.24
- Vitest and React Testing Library

## Quick start

- Clone the repo
- Install dependencies
- Start the dev server

```bash
git clone https://github.com/Nitish-Kumar-Pradhan/Star-Wars-Character-App.git
cd Star Wars Character App
npm install
npm run dev
```

Open http://localhost:5173 in your browser. Login with any username and password because auth is a mock flow.

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm run test
npm run test:ui
```

## Project structure

```
src/
  components/      # React components
  context/         # Auth context
  services/        # API services (api.js)
  utils/           # Utility functions
  App.jsx          # Main application entry
  main.jsx         # App bootstrap
  index.css        # Tailwind base styles

tests alongside components:
src/components/__tests__/CharacterModal.test.jsx
```

## API integration

- Base URL: https://swapi.dev/api
- Key functions in src/services/api.js:
  - getCharacters(page) — Fetch paginated characters
  - getCharacterDetails(url) — Fetch single character details
  - getHomeworld(url) — Fetch homeworld information
  - getAllCharacters() — Fetch all characters for building filter options

### API call flow

- Initial load calls getCharacters(1) which hits /people/?page=1
- Character details are fetched on demand in the modal via getCharacterDetails(url), then getHomeworld(url)
- Filtering uses getAllCharacters() to extract unique values and fetches names in parallel when needed

## Usage

- Browse the character list and use pagination controls to move between pages
- Click a character card to open a detail modal with additional info
- Use the search input for live filtering by name
- Open filter controls to select homeworld, species, or film and apply filters
- Login to access protected parts of the UI if the demo enables them

## Authentication

- Mock authentication flow for demo purposes
- Token stored in localStorage
- Token expires after one hour
- App simulates token auto-refresh every five minutes while session is active
- Any username and password combination is accepted in demo mode
- Do not use this flow in production; replace with a real auth provider

## Performance and optimizations

- Lazy-load character details only when needed
- Parallel network requests when resolving filter values
- Skeleton loaders at component level for better perceived speed
- Staggered animations for list entry to reduce layout jank
- Vite handles code splitting, tree shaking, and minification for production builds

## Testing

- Unit and UI tests use Vitest and React Testing Library
- Example test commands:
  - npm run test
  - npm run test:ui
- See src/components/__tests__ for example tests and patterns to follow

## Deployment

- Build the app:

```bash
npm run build
```

- Deploy the contents of the dist folder to a static host such as Vercel, Netlify, or any static hosting provider.

## Contributing

- Open an issue to discuss features or bugs
- Create a branch per feature or fix
- Open a pull request with a clear description of changes
- Keep commits small and focused and include tests for new behavior

## License

This project is available under the MIT License. See the LICENSE file for details.

## Contact

- Project maintainer: Nitish Pradhan 
- Email: nitishpradhan66@gmail.com 
