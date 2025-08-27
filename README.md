# 🎬 TV Show Explorer (Angular 17)

A production-grade POC built with **Angular 17 (standalone)** that explores TV shows from the public **TVMaze API**. It includes search, show details (cast & episodes), local reviews with Redux (NgRx), responsive UI, forms validation, and unit tests.

## ✨ Features
- **Search Shows** (GET `/search/shows?q=`) with validation, pagination, loading & error UI
- **Show Details** (GET `/shows/:id`) + **Cast** (GET `/shows/:id/cast`) + **Episodes** (GET `/shows/:id/episodes`)
- **Episodes grouped by season** (native `<details>` accordion) + YouTube trailer placeholder
- **Local Reviews**: add/edit/delete, stored in **localStorage**, managed via **NgRx (Redux)**
- **Responsive** grid & mobile-friendly header
- **State Management**: Global store for `reviews` and basic `ui.loading`
- **Validation**: Angular Reactive Forms with inline errors
- **Testing**: Component & service tests (Karma + Jasmine)

> Note: The original spec mentioned *React Hook Form + Yup*. In Angular, this is implemented with **Reactive Forms + Validators** for an idiomatic Angular experience.

## 🧰 Tech Stack
- Angular 17 (standalone APIs, signals)
- RxJS for async & API handling
- NgRx Store/Effects (Redux) for reviews
- Karma + Jasmine for unit tests

## ▶️ Getting Started
```bash
# 1) Install Node 18+ and npm
# 2) Install deps
npm install

# 3) Run in dev
npm start  # opens http://localhost:4200

# 4) Run unit tests
npm test
```

## 📁 Key Paths
- `src/app/features/search` – search page + show cards
- `src/app/features/show-detail` – detail + cast + episodes
- `src/app/features/reviews` – reviews page + form
- `src/app/core/services/tvmaze-api.service.ts` – API client
- `src/app/state` – NgRx store for reviews & UI

## 🔌 API
- Base: `https://api.tvmaze.com`
- Docs: https://www.tvmaze.com/api

## 🧪 Sample Tests
- `show-card.component.spec.ts` – component creation
- `search.page.spec.ts` – page creation
- `tvmaze-api.service.spec.ts` – verifies API request URL
- `reviews.page.spec.ts` – page with store

## 📱 Responsiveness
- Responsive CSS grid scales 1–4 columns
- Sticky header with simple nav

## ♿ Accessibility
- Form controls include labels/placeholders and inline error messaging

## 📝 Notes
- This project omits `node_modules` for size; run `npm install` first
- You can enhance reviews persistence using NgRx Effects or Meta-Reducers (a simple localStorage approach is included)

---
Made for the TV Show Explorer POC.
