# Senior Review Rubric

Reference for Phase 2 (altitude diagnosis) and Phase 3 (adversarial review) of the `junior-to-senior` skill.

## Altitude diagnostics

Classify each section of the artifact independently. A plan is usually **mixed**: fogged on the hard parts, tunneled on the easy ones — because the junior wrote detail where it was comfortable and abstraction where it was not. That inversion (detail on easy parts, fog on hard parts) is itself a finding.

### Fog tests (too vague)

Run these against every component, step, or workstream the plan names. Each "no" is a finding.

1. **Start-tomorrow test** — could a competent engineer begin this item tomorrow without making an architecture or product decision themselves? If they'd have to choose a library, design a schema, or define an API first, the plan didn't plan it.
2. **Interface test** — does anything that crosses a boundary (function, service, queue, file, network) have its shape written down? Names of fields, not "the relevant data".
3. **Failure test** — for each external interaction (network, disk, user input, third-party API), does the plan say what happens when it fails? "Handle errors" is not an answer.
4. **Quantity test** — are load-bearing quantities stated? Expected row counts, payload sizes, request rates, latency budgets. "Should be fast" is fog.
5. **Named-technology test** — is every "a cache / a queue / some auth layer" either named (with version) or explicitly listed as an open decision with the candidates?

### Tunnel tests (too granular / missing vision)

Run these against the artifact as a whole. Each "no" is a finding.

1. **Audience test** — does the plan say who this is for and what they can do afterward that they couldn't before?
2. **Success test** — is there an observable definition of success? A metric, a demo, a passing test suite, a user behavior — something checkable.
3. **Non-goals test** — is anything explicitly out of scope? A plan with no non-goals has not been scoped, only described.
4. **Alternative test** — does the plan say why this approach beat the obvious boring alternative? If no alternative was considered, the choice was a default, not a decision.
5. **Sequencing test** — is there an ordering with a smallest useful version first, or is it a flat list of equally-weighted tasks?
6. **Proportionality test** — does the detail land where the risk is? Twenty lines on a helper function and one line on the data migration means the plan is upside down.

## Vague-word blacklist

When these appear without immediate quantification or specification, challenge them with the concrete question they are hiding from:

| Word | Hidden question |
|---|---|
| simple / straightforward | Simple compared to what? What did you not have to handle? |
| scalable | To what number, on what axis, measured how? |
| robust / resilient | Against which specific failures? What is the recovery path? |
| handle gracefully | What exactly happens? Retry, drop, queue, surface to user? |
| performant / fast | What latency/throughput budget, at what percentile? |
| secure | Against which threat model? Who is the attacker? |
| flexible / extensible | For which anticipated change? Flexibility has a cost — who pays it? |
| later / eventually / for now | Is this a sequencing decision or an unowned risk? Who reopens it, triggered by what? |
| etc. / and so on | The list was the work. Finish it. |
| appropriate / as needed | By whose judgment, applied when? |
| leverage / utilize | Usually decorating an undecided choice. Name the thing. |

## Severity definitions

- **Blocker** — the plan fails as written. Examples: targets an API the pinned dependency version doesn't have; contradicts an existing architectural decision in the repo without acknowledging it; omits a data migration that the change requires; relies on a pattern that has a published security advisory against it; an entire hard component is fog (fails the start-tomorrow test).
- **Major** — the plan works but is meaningfully worse than the current state of the art or misfit to this repo. Examples: hand-rolls something a maintained, already-installed dependency provides; uses a pattern superseded since the training cutoff (with source); detail is inverted (proportionality failure); no rollback story for a hard-to-reverse step; success criteria exist but aren't observable.
- **Minor** — polish. Naming, doc gaps, small idiom mismatches with the surrounding codebase, ordering tweaks that reduce risk but don't change the outcome.

Calibration rules:

- Severity reflects consequence, not effort-to-fix. A one-line version bump can be a blocker.
- Every finding carries evidence (file:line, or source + date) and a concrete fix. A finding without a fix is a question — put it in "Open questions" instead.
- Do not inflate. Three real blockers reads as a serious review; ten padded ones reads as noise and gets ignored.
- Track "what the junior got right" with the same care as faults. The rewrite must preserve it, and the user needs to see the review is calibrated, not performatively hostile.

## Adversarial discipline

- **Steelman first.** Before attacking a choice, state the strongest case for it in one or two sentences. If you cannot, you do not understand it well enough to reject it.
- **Attack the artifact, not the author.** Findings name the text's failure, not the agent's.
- **Concede when beaten.** If research validates the junior's choice, say so and move on. An adversarial review that cannot return "this holds" is a ritual, not a review.
- **One altitude per finding.** Do not bundle "this is vague" with "this library is outdated" — they have different fixes.
- **No invented requirements.** If the review wants a constraint the user never stated (e.g., "must support 1M users"), that is an open question for the human, not a finding.
