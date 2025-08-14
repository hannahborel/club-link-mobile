# club-link-mobile

![Node 20](https://img.shields.io/badge/node-20.x-43853d?logo=node.js&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-Managed_Workflow-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.7x-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-6-CA4245)
![RN Paper](https://img.shields.io/badge/React_Native_Paper-UI-6200EE)
![NativeWind](https://img.shields.io/badge/NativeWind-Styling-38B2AC)
![ESLint](https://img.shields.io/badge/ESLint-configured-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-configured-ff69b4?logo=prettier&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)
![Issues](https://img.shields.io/github/issues/hannahborel/club-link-mobile)
![Stars](https://img.shields.io/github/stars/hannahborel/club-link-mobile?style=social)

Member-facing mobile app built with Expo.

## Tech Stack

- Expo (React Native)
- TypeScript
- UI: React Native Paper + NativeWind
- Navigation: React Navigation 6
- Auth: Clerk

## Requirements

- Node 20 (see `.nvmrc`)
- Expo CLI (installed globally or via npx)

## Setup

```bash
nvm use
npm install
```

## Scripts

```bash
npm run lint    # ESLint across the repo
npm run format  # Prettier format
```

## Tooling

- ESLint (TypeScript, import, unused-imports)
- Prettier (enforced via VSCode settings)
- Husky + lint-staged (runs on pre-commit)

## Project Structure (planned)

- `src/screens` – screens
- `src/components` – shared UI
- `src/navigation` – navigation setup and types
- `src/services` – API clients
- `src/hooks` – custom hooks
- `src/types` – shared types

## Environment Variables

Will be added when app scaffold is created (Clerk keys, API base URL, etc.).

## Contributing

Pre-commit hooks run lint-staged. Ensure a clean `npm run lint` and `npm run format` before pushing.
