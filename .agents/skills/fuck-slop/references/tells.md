# AI-Writing Tell Catalog

Detection patterns for the F*ck Slop scan. Patterns are written for `grep -Ein` (extended regex, case-insensitive, line numbers) so they can be run literally against a file:

```bash
grep -Ein -f /dev/stdin draft.txt <<'PATTERNS'
<paste patterns from a section below, one per line>
PATTERNS
```

When the text only exists in conversation, apply each pattern by hand. A match is a *finding*, not an automatic deletion — every finding goes through the Phase 2 triage in SKILL.md. Density matters: one em dash is nothing; one em dash plus a negative parallelism plus "delve" in the same paragraph is a verdict.

## 1. Negative parallelism — the "not X but Y" family

The highest-priority category. LLMs reach for the negation-then-assertion move roughly once a paragraph; humans use it occasionally and deliberately. It is an emergent generative habit, so expect it to reappear in paraphrased form after every rewrite pass — that is why the scan loops.

```
not (just|only|merely|simply|solely) [^.;]{2,80}(but|it'?s| — )
isn'?t (just|only|merely|simply|about) 
it'?s not (a|an|the|that|about|just) [^.;]{2,80}(it'?s|but)
(is|was|are|were)n'?t about [^.;]{2,60}\. (it|this|that)'?s about
less about [^.;]{2,60}(than|and more about)
more than (just|a mere|simply) 
not because [^.;]{2,80}but because
the (question|point|issue|problem|goal|real [a-z]+) is(n'?t| not) (whether|about|just|if)
(doesn'?t|don'?t|didn'?t|won'?t) (just|merely|simply) [^.;]{2,80}(it|they|he|she|we) 
no [a-z]+, no [a-z]+(, no [a-z]+)?[,.]? just 
— not [^—.;]{2,60}, but 
not only [^.;]{2,80}but (also )?
we'?re not (just )?(talking about|looking at|dealing with)
gone are the days
(here|this)'?s the (thing|kicker|catch|twist)
```

Rhetorical-question variant (regex-resistant; check by hand): a one-line question immediately answered by a one-word or one-clause sentence. *"The result? Chaos."* / *"Sound familiar?"*

## 2. Puffery and inflated vocabulary

Single words that spike in LLM output. Each is fine in isolation; two or more per page is a finding. The fix is the plain word or the concrete fact the word was hiding.

```
\b(delve|delving)\b
\btapestry\b
\b(testament|stands as)\b
\bseamless(ly)?\b
\b(pivotal|paramount|crucial)\b
\bunderscore(s|d)?\b
\b(landscape|realm|sphere) of\b
\bnavigat(e|ing) the\b
\bfoster(s|ing)?\b
\bleverage(s|d)?\b
\bmeticulous(ly)?\b
\bintricate\b
\bboasts\b
\bgame.?chang(er|ing)\b
\b(seismic|monumental|transformative) (shift|change)\b
\bunwavering\b
\bcommendable\b
\belevate(s|d)? (the|your)\b
\bshowcas(e|es|ing)\b
\bresonate(s|d)?\b
\bcompelling\b
\brich (cultural )?(heritage|history|tradition)\b
\bvibrant\b
\bplays? a (vital|key|crucial|pivotal) role\b
\bdeep(er)? dive\b
\bunlock(s|ing)? (the|your)\b
\bharness(es|ing)? the\b
\bembark(s|ed|ing)? on\b
\bever.?(evolving|changing)\b
\bfast.?paced (world|environment)\b
\bin today'?s\b
\bat the end of the day\b
\bwhen it comes to\b
\bcutting.?edge\b
\brobust\b
\bholistic\b
\bsynergy\b
\bempower(s|ing|ment)?\b
```

## 3. Hedging, both-sidesing, throat-clearing

The tell is reflexive balance: every claim gets a softener, every opinion gets a counterpoint. Commit or cut.

```
it'?s (worth|important) (to note|noting|to remember|to consider)
(that|it) (being )?said,
while (it'?s|this is) (true|important)
arguably
in many ways
to some (extent|degree)
on the other hand
at its core
in essence
essentially,
ultimately,
in conclusion
in summary
to sum(marize| up)
overall,
in the end,
needless to say
as (we|you) (can see|know|all know)
let'?s (dive|unpack|explore|take a (look|closer look))
whether you('re| are) [^.;]{2,60} or 
```

## 4. False ranges and rule-of-three

**False range** — a "from X to Y" with no actual spectrum between X and Y:

```
from [^.;]{3,50} to [^.;]{3,50}
```

Triage by hand: if you can name a meaningful midpoint, it's a real range and stays. If X and Y are just two loosely related examples, name them plainly or cut one.

**Rule of three** — LLMs default to triplets to make thin analysis look thorough. Regex only catches the simplest shape; check lists by hand too.

```
\b\w+, \w+, and \w+[.!?]
\b(\w+ \w+), (\w+ \w+), and (\w+ \w+)
```

Triage: keep the strongest item, cut the rest — or keep all three only if each carries distinct information, and then break the rhythm.

## 5. Punctuation and formatting

Em dash: not banned — humans use it. Findings are about **density** and the contrast move:

- More than ~1 em dash per 150 words.
- Two em dashes in one sentence.
- `— not X, but Y` (already in section 1).
- Em dash used for punchy emphasis where a comma works: `[a-z] — [a-z][^—]{1,25}\.$`

Other formatting tells (check by hand; most regexes here are layout-dependent):

- **Bold scattered through prose** like a textbook highlighting itself: `\*\*[^*]{2,40}\*\*` appearing more than ~once per 3 paragraphs of body prose.
- **"Term: definition" bullets**: `^[-*] +\*\*[^*]+:?\*\*:? ` — the signature LLM list shape.
- **Emoji headers/bullets** (🚀, ✅, 💡): needs PCRE, not `-E` — `LC_ALL=C.UTF-8 grep -Pn '^\s*[-*#]+\s.*[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' draft.txt`.
- **Headers on short texts** — section headers on anything under ~400 words.
- **The tidy skeleton** — intro that previews three points, three matched sections, conclusion that restates them. Resolves too neatly; real writing has loose ends.
- **Numbered lists where a paragraph would do.**
- Curly quotes/apostrophes in a context where the author types straight ones (mixed within one text is the stronger tell).

## 6. Cadence and statistical shape

No regex; measure or eyeball.

- **Uniform sentence length** (the single strongest current tell): a run of 3+ consecutive sentences within ±4 words of each other, paragraph after paragraph of 18–24-word sentences. Quick measurement on a file:

  ```bash
  tr '\n' ' ' < draft.txt | sed 's/[.!?] /\n/g' | awk '{print NF}'
  ```

  Human prose mixes 4-word sentences with 30-word sentences. Variance should be obvious at a glance.
- **Uniform sentence shape**: every sentence opens subject-first; no fragments, no questions, no inversions.
- **Uniform paragraph length**: every paragraph 3–4 sentences.
- **Low specificity**: "many companies", "studies show", "experts agree", "recent research", "various factors" — generic where a human who knew the material would name names, numbers, dates. (Fix only with real specifics; never invented ones.)
- **No friction**: nothing colloquial, no aside, no opinion held without a softener, nothing that risks being disagreed with.

## 7. Genre-specific instant tells

Covered in detail in [voices.md](voices.md); the headline items:

- **Reddit/forums**: bold mid-comment, bullet-pointed comments, "Hope this helps!", perfectly balanced takes.
- **Tweets/X**: "🧵", "Let that sink in", line-broken one-clause-per-line cadence, ending on a question to drive engagement.
- **LinkedIn**: one-sentence paragraphs stacked vertically, "Agree?", the not-X-but-Y move (its natural habitat).
- **Academic**: "delve", "novel insights", puffed significance claims ("crucial implications for the field"), citation-free superlatives.
- **Email**: "I hope this email finds you well", restating the recipient's question back at them, three-paragraph symmetry for a one-line answer.
