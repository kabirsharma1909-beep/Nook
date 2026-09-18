# Reading Profile — early literacy screening (MVP)

A screening prototype, not a diagnostic tool. It builds a reading profile
across five domains commonly used in early literacy screening, so a parent
or teacher knows where to look closer — it does not diagnose dyslexia.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

```bash
npm run build      # production build to dist/
npm run preview    # preview that build locally
```

No backend, no API keys, no environment variables. Everything is a
self-contained React app; accounts and results are stored in the
browser's `localStorage` (see "Where data lives" below).

## Project structure

```
src/
  components/       Reusable UI: BookIntro, ScramblingText, StatCounter,
                     SampleAssessment, FeatureShowcase, ThemeSwitcher,
                     ProgressChart, SkillProfile, ExerciseCard,
                     AssessmentQuestion, ResultsProfile, Nav, AuthLayout,
                     ScrollSection
  pages/            One file per route (see below)
  context/          ThemeContext (palette + light/dark), AuthContext
                     (mock account/child/assessment/exercise storage)
  data/             questions.js, exercises.js, statistics.js — all
                     content lives here, separate from UI code
  utils/            scoring.js (screening → reading profile),
                     storage.js (localStorage layer), gsapSetup.js
  styles/           themes.css (design tokens per palette/mode),
                     global.css (type scale, layout, buttons, forms)
```

## Routes

| Path | Page |
|---|---|
| `/` | Landing page (scrollytelling intro, education, sample assessment, feature tour) |
| `/login`, `/create-account`, `/forgot-password` | Auth screens |
| `/setup-child` | Child profile creation (post-signup) |
| `/dashboard` | Calm authenticated home: profile, today's exercises, progress, activity |
| `/assessment` | The adaptive screening itself |
| `/results/:assessmentId` | One screening's reading profile and next steps |
| `/exercises` | Full practice library, filterable by domain |
| `/progress` | Composite and per-domain trend lines |
| `/reports` | Printable summary for a teacher, tutor, or clinician |

## What's implemented

- Full account creation, login, forgot-password (mocked, local only),
  and child profile setup
- A calm, working dashboard: reading profile, today's exercises, a
  progress chart, and recent assessment activity
- A complete, working 6–10 age-band assessment: 16 questions across five
  domains (phonological awareness, letter-sound knowledge, decoding,
  word recognition, verbal working memory), each with a difficulty
  rating. Question selection adjusts difficulty after each answer
  (`src/pages/Assessment.jsx`) — genuinely adaptive, not scripted.
- Scoring that turns raw responses into a domain-by-domain reading
  profile with qualitative bands (strength / developing / needs
  attention), never a diagnosis or severity claim
  (`src/utils/scoring.js`)
- Personalized exercise recommendations driven by the lowest-scoring
  domains, with completion tracking
- Progress tracking across repeated screenings (composite + per-domain
  trend lines)
- A printable parent/professional report (`window.print()` — no PDF
  library needed for the MVP)
- A public, ungated 3-question sample assessment on the landing page,
  explicitly labeled as a sample and never scored
- Full theme system: 3 curated palettes (Paper / Charcoal / Slate) ×
  light/dark mode, all as CSS custom properties in
  `src/styles/themes.css`, switchable from the nav on every screen,
  persisted to `localStorage`, and defaulting to the OS preference via
  `prefers-color-scheme` on first visit
- The GSAP + ScrollTrigger scrollytelling intro (`BookIntro.jsx`): a
  pinned, scroll-scrubbed sequence where two panels open like a book,
  a headline appears, and three words in the second line visibly swap
  character positions and reassemble — driven by scroll progress, not
  autoplay, and respecting `prefers-reduced-motion`

## Where things are configured

- **Assessment questions**: `src/data/questions.js` — `fullAssessment`
  is the real 6–10 bank, `sampleQuestions` is the ungated landing-page
  taste. Both are just arrays; add or edit questions there.
- **Exercises**: `src/data/exercises.js`, grouped by the same `domain`
  keys as the questions.
- **Scoring thresholds**: `src/utils/scoring.js` → `BAND_THRESHOLDS`.
  Change the two numbers there to retune what counts as "strength" vs
  "needs attention." Nothing else needs to change.
- **Landing-page statistics**: `src/data/statistics.js`. Every figure
  has a `source` and `href` field and a comment marking it as a
  commonly cited, rounded estimate that should be checked against the
  primary source before a real demo or launch.
- **Themes**: `src/styles/themes.css` (color tokens) and
  `src/context/ThemeContext.jsx` (the `PALETTES` list shown in the
  switcher UI).
- **GSAP / ScrollTrigger animation**: `src/components/BookIntro.jsx`
  (the pinned scroll sequence and character-swap logic) and
  `src/components/ScrollSection.jsx` (the smaller one-time reveal used
  on the rest of the landing page). `src/utils/gsapSetup.js` is the
  single place the ScrollTrigger plugin is registered.

## Where the future ML model plugs in

Nothing here claims machine-learning accuracy — scoring is a
transparent, rule-based rubric on purpose (see `scoring.js`). To
upgrade later:

- Response-level data already captured per question (`correct`,
  `responseTimeMs`, `domain`) in `AssessmentContext`/`AuthContext`'s
  `assessments` records is enough feature material for a real model.
- Swap the body of `scoreAssessment()` in `src/utils/scoring.js` for a
  call to a hosted model or API — the function's input (`responses`)
  and output shape (`domainScores`, `overallScore`, `overallSignal`)
  are the only contract the rest of the app depends on.
- The isolated, clearly-labeled seam for the reading-analysis feature
  in `FeatureShowcase.jsx` (`ReadingAnalysisDemo`) is a static mock and
  the obvious place to wire in real passage-reading / speech analysis
  once that's built — it's visually separated so it's easy to swap.

## Limitations to disclose during a demo

- **This is a screening tool, not a diagnostic one**, and the app never
  claims otherwise — see the disclaimer text baked into
  `ResultsProfile.jsx` and `Reports.jsx`.
- **Scoring is a transparent rule-based rubric**, not a trained model.
  No ML accuracy is claimed anywhere in the app or copy.
- **No speech or audio analysis is implemented.** Questions that
  reference reading aloud ask the user to judge their own reading
  silently; a real product would need actual audio capture and
  analysis, which is out of scope for this MVP.
- **Only the 6–10 age band is fully implemented.** The landing page is
  explicit that 6–7 has sample items only and 10+ is not yet built —
  see the "Built for different stages" section and its `status` field
  in `Landing.jsx`.
- **Accounts and results live only in the browser's `localStorage`**
  for this prototype (`src/utils/storage.js`). There is no server, no
  encryption at rest, and no real password hashing — don't use real
  personal data with it as-is.
- **The landing-page statistics are rounded, commonly cited figures**
  attributed to named organizations, not independently verified for
  this build. Check them against the linked primary sources before
  citing them publicly (see `src/data/statistics.js`).
- **Forgot-password is mocked.** No email is actually sent.
- This was built and organized in a sandboxed environment without
  network access, so `npm install` has not been run or smoke-tested
  here — dependencies are pinned to versions that should install
  cleanly, but run `npm run build` locally before a live demo to catch
  anything environment-specific.
