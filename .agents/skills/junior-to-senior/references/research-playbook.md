# Senior Research Playbook

Reference for Phase 1 of the `junior-to-senior` skill: how the senior earns expertise the junior doesn't have. Two tracks, run in this order — code research grounds the review in this repo; web research grounds it in the present.

## Track 1: Code research

Goal: know what is *true here* before judging the plan against it. Prefer a context-isolated explore subagent for broad sweeps; bring back conclusions, not file dumps.

Checklist per plan:

1. **Versions.** Read the lockfile/manifest (`package-lock.json`, `poetry.lock`, `go.mod`, `Cargo.lock`, ...) for every dependency the plan touches. Record exact pinned versions. Any plan step that assumes an API must be checked against the pinned version's docs, not the latest.
2. **Conventions.** Find 2-3 existing implementations of the closest analogous feature. How does this repo do routing, errors, config, tests, migrations? The plan either matches or justifies the break.
3. **Prior decisions.** Search for ADRs, `docs/`, design notes, and revealing commit messages on the touched paths. A plan that re-litigates a settled decision without knowing it was settled is a blocker.
4. **Real constraints.** Deploy target, build system, CI time budget, supported platforms, existing data volume and shape. These kill more plans than design taste does.
5. **Blast radius.** What actually imports/calls the things the plan changes? The junior plan's scope estimate is a guess; the dependency graph is a fact.

## Track 2: Web research

Goal: find where the world moved after the training cutoff. Research the plan's *load-bearing decisions* (from Phase 1a), not every line — typically 3-7 searches total, not 30.

### Query patterns

For each load-bearing decision, run the subset that applies:

- `<library> changelog` / `<library> release notes <current year>` — catch deprecations and new APIs since cutoff.
- `<approach> vs <alternative> <current year>` — check whether the tradeoff has flipped.
- `<pattern> deprecated` / `<pattern> considered harmful` — find published reversals.
- `<technology> best practices <current year>` — only useful when followed to a primary source; the query itself attracts SEO spam, so treat listicle results as pointers, not evidence.
- `<library> security advisory` / check the project's GitHub security tab — non-negotiable for auth, crypto, parsing, and anything touching user input.
- `site:github.com <library> issues <feature>` — maintainer-stated direction and known footguns.

Always pin the current year or "latest" into queries — undated queries return the same era the model was trained on, which defeats the point.

### Source quality ranking

1. Official documentation, changelogs, release notes, RFCs — cite freely.
2. Maintainer blog posts, GitHub issues/discussions where maintainers state direction.
3. Engineering postmortems and benchmarks from teams that ran the thing in production (with dates and numbers).
4. Conference talks, well-known practitioner blogs — corroborate before citing for a blocker.
5. SEO listicles, AI-generated tutorials, undated content — never evidence, at most a pointer to a real source.

Every cited source gets a date check. A "best practices" article from before the relevant major version is training-data-era knowledge wearing a URL.

### What you are looking for

- **Deprecations** — the plan's approach is discouraged or removed in current versions.
- **Supersessions** — a newer pattern/API has clearly won (look for the old way's own docs pointing at the new way — that's the strongest signal).
- **Hard-won lessons** — advisories, postmortems, benchmarks that change the tradeoff the junior made on priors.
- **Confirmations** — the junior's choice still holds. Record these too; they go in "What the junior got right".

### When to stop

- Each load-bearing decision has either one primary source confirming/refuting it, or two independent secondary sources agreeing.
- Two consecutive searches on a decision return nothing newer than what you knew — the world likely didn't move; mark it confirmed-by-absence and move on.
- Diminishing returns: research budget belongs on blockers and majors, not minors. If a finding would be minor either way, don't research it.

### No web access

Run Track 1 fully, skip Track 2, and tag every best-practice claim in the review `[training-data, unverified]`. Tell the user the review is grounded in the codebase but not refreshed against current SOTA, and name the decisions most likely to have shifted so they can spot-check.
