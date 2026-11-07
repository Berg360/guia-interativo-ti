# Copilot instructions

## Build and run

- Requires Node.js `>=20.19`.
- `npm install` installs dependencies and runs `postinstall`, which prepares the local assets for the embedded Python course.
- `npm run dev` starts Vite at `http://127.0.0.1:5173`.
- `npm run build` runs `prepare:python`, strict TypeScript checking (`tsc -b`), and the Vite production build.
- `npm run preview` serves the production build at `http://127.0.0.1:5173`; the dev and preview servers use the same strict port.
- `npm run prepare:python` regenerates/copies Python-course Tailwind, Chart.js, and Pyodide assets under `public/python-course/vendor`.
- There are no project test or lint scripts and no project test files, so there is no configured single-test command. The Pyodide package under `public/python-course/vendor` is a runtime dependency, not this repository's test suite.

## Architecture

- `src/main.tsx` mounts the React app and registers `public/sw.js` in production. `src/App.tsx` owns top-level navigation and course selection; the Gestión de TI study, practice, quiz, progress, and planner screens are composed from separate components in `src/`.
- The Gestión de TI course model is in `src/data/curriculum.ts`; related concept content, answer guides, and learning/progress calculations live in `src/data/concepts.ts`, `answers.ts`, and `learning.ts`. Screen components read and update the browser `localStorage` records that `learning.ts` uses to calculate review status, mastery evidence, and recommendations.
- `src/data/studyPrograms.ts` is the shared registry used by the adaptive planner and backup/restore UI. It defines program IDs, units, kinds, and the per-program storage keys; `Planner.tsx` uses those entries to plan sessions, while `BackupPanel.tsx` uses them to scope exports and restores.
- PyNeuro Evolution is a standalone page at `public/python-course/index.html`, not part of the React bundle. The host opens it in a sandboxed iframe, passes its saved state when launching it, and accepts only validated messages from that iframe for the allowlisted Python storage keys. Keep the iframe message shape and state version in sync between `src/App.tsx` and the Python page.
- `scripts/prepare-python-course.mjs` generates/copies the local dependencies used by that page. `public/sw.js` implements production offline caching; its cache name versions the cached app shell and assets.

## Repository-specific conventions

- User-facing product content is in Brazilian Portuguese. Keep course terminology and user-visible text consistent with `pt-BR`.
- Treat course IDs, branch IDs, and topic order as persistent data: review and practice records use keys built from course ID, branch ID, and topic index. If curriculum edits change those identifiers or reorder topics, consider existing browser data and whether a migration is needed.
- When adding a course that should appear in the planner and backup/restore selectors, register it in `src/data/studyPrograms.ts` and list every storage key belonging to it. Keep each program's calendar and progress storage scoped by its stable program ID.
- Keep curriculum and learning-guide data in `src/data/` rather than embedding it in screen JSX. The React app's styles are in `src/styles.css`; the standalone Python page's Tailwind input is `src/python-course.css`, with generated output in `public/python-course/vendor/`.
- The Python page uses its own storage when opened directly and a host-mediated storage bridge when embedded. Preserve the `pyneuro-course` message source, `storage:set` type, allowed key list, and state validation when changing persistence behavior.
- The service worker precaches the app shell and extracts built `/assets/` URLs from `index.html`; update its cache version when changing the offline cache contract.
