# PIVOT — site copy

Every piece of text on the site, in the order you scroll past it. Reflects what is
currently live. Items still being finalized are marked **TBD**.

Edit this file and tell me to apply it, or edit the source files directly — the file for
each block is listed so you can go straight there.

---

## 1. Navigation — `src/components/Nav.jsx`

Hidden on the hero; fades in once you scroll past it.

| Element | Text |
| --- | --- |
| Wordmark | PIVOT |
| Links | About · Schedule · Judges · Team · Sponsors & Prizes · Questions |
| Button | Apply |

Link labels come from `src/scenes.js` (the `label` on each scene).

---

## 2. Hero — `src/components/Hero.jsx`

| Element | Text |
| --- | --- |
| Date line | September 13, 2026 |
| Wordmark | PIVOT |
| Tagline | A 12-hour adaptive hackathon where every team is forced to rethink their solution. |
| Button | Apply |
| Countdown labels | Days / Hours / Mins / Secs |
| Backing line | Backed by Waterloo Tech Week |
| Scroll cue | Scroll |

`EVENT_DATE` is now `'2026-09-13T09:00:00'`, so the countdown is real. **The 09:00 start
time is my assumption** — change it if the day starts elsewhere; it only shifts the
hours/mins, not the day count.

---

## 3. About — `src/components/About.jsx`

| Element | Text |
| --- | --- |
| Heading | About |
| Eyebrow | Why Pivot? |

**Card 1 — What is PIVOT?**

> PIVOT is a 12-hour adaptive hackathon where the challenge unfolds throughout the day.
> Instead of revealing the entire challenge at the beginning, teams receive new
> information every two hours that changes how they should think about their solution.
> The first three reveals are shared by every team, while the final reveal—the Pivot—is
> unique to each team.

**Card 2 — Why We Built It**

> Real product development is iterative. Requirements change, customers change,
> priorities shift, and products evolve. PIVOT recreates that experience by rewarding
> adaptability instead of rewarding whoever picked the best idea at the start. Success
> isn't measured by sticking to the original plan—it's measured by how well teams pivot
> when the plan changes.

**Card 3 — By the Numbers**

| Value | Label |
| --- | --- |
| 12 | Hours |
| ~30 | Participants |
| TBD | Prizes |
| TBD | Judges |

Three cards arrive one at a time while the section is pinned.

---

## 4. Schedule — `src/components/Schedule.jsx`

| Element | Text |
| --- | --- |
| Heading | Schedule |
| Eyebrow | Coming Soon |

Seven events, one per waypoint down the waterfall:

| # | Time | Title | Description |
| --- | --- | --- | --- |
| 1 | TBD | TBD | Schedule coming soon. |
| 2–7 | TBD | TBD | TBD |

The dot count follows the array — add or remove events and the waypoints redistribute
evenly down the line automatically. The `02 / 07` counter updates itself too.

Descriptions want to stay short — two lines is the comfortable maximum.

---

## 5. Judges — `src/components/Judges.jsx`

| Element | Text |
| --- | --- |
| Heading | Judges |
| Eyebrow | Coming Soon |

Five gold vintage frames in one row, all **TBD** (initials, name, role).

`initials` is its own field — it isn't derived from the name, so set it explicitly.
Roles wrap to two lines; much longer and they'll push a frame taller than its neighbours.

---

## 6. Team — `src/components/Team.jsx`

| Element | Text |
| --- | --- |
| Heading | Team |
| Eyebrow | Coming Soon |

Five diamond frames, all **TBD** (initials, name, role).

Roles are single words by design — the diamonds are narrow and a long role wraps awkwardly.

---

## 7. Sponsors & Prizes — `src/components/Sponsors.jsx`

| Element | Text |
| --- | --- |
| Heading | Sponsors & Prizes |
| Eyebrow | Coming Soon |

Three prize tiers, every field TBD:

| Label | Amount | Note |
| --- | --- | --- |
| TBD | TBD | TBD |
| TBD | TBD | TBD |
| TBD | TBD | TBD |

**Backed By** — four TBD slots. Any multiple of four fills the grid cleanly; other counts
leave a gap in the last row.

---

## 8. Questions (FAQ) — `src/components/FAQ.jsx`

| Element | Text |
| --- | --- |
| Heading | Questions |
| Eyebrow | Coming Soon |

| Question | Answer |
| --- | --- |
| Q1 | *(blank)* |
| Q2 | *(blank)* |
| Q3 | *(blank)* |

All three start closed — an open panel with a blank answer reads as broken. Add or remove
rows freely; the accordion grows to fit however long the answers run.

---

## 9. Footer — `src/components/Footer.jsx`

| Element | Text |
| --- | --- |
| Wordmark | PIVOT |
| Blurb | A 12-hour adaptive hackathon where every team is forced to rethink their solution. |
| Column heading | Contact |
| Email | TBD |
| Location | Waterloo, ON |
| Back-to-top | Top |
| Copyright | © 2026 PIVOT |

GitHub, Twitter/X and the mail icon all point at `#` until the real accounts exist.

---

## Things that repeat — change together

- **Date** — hero date line, and `EVENT_DATE` for the countdown
- **"12 hours"** — hero tagline, About card 1, About stats, footer blurb, and any FAQ answer
- **Email** — footer contact line, and the footer's mail icon link
- **Participant count** — About stats, and any FAQ answer that mentions it
- **Application link** — hero Apply button and nav Apply button

## Still unwired

- `Apply` in the hero and nav both point at `#` — replace with the Luma URL when applications open.
- GitHub, Twitter/X and contact email are placeholder links.
- `EVENT_DATE` is stale (see the warning in section 2).

## Section names vs. scene art

The headings are now plain (About, Schedule, Judges, Team) but the backgrounds are still
the themed world — meadow, waterfall, swan glade, crystal cave, night market, clouds. That
reads fine, but the old themed headings ("The Meadow", "The Stream") are gone, so the art
no longer gets named anywhere. Worth a decision at some point; nothing is broken.
