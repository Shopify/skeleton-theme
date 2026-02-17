# Shopify Theme Agency Core System - Implementation Plan

**Project**: Build core theme as NPM package for scalable multi-client deployment
**Architecture**: NPM Package (separate repos per theme)
**Base**: Skeleton (Shopify's official baseline) + Horizon features (one-time copy)
**Strategy**: Core as npm package + client overlays with semantic versioning

**Related Plans**:
- **Hanro Migration**: See `hanro-migration.md` for pilot client migration details

---

## Plan Evolution

**Updated**: January 29, 2026 - Revised base theme strategy based on CTO feedback

**Change**: Base theme approach
- **Previous**: Fork from Horizon, track Horizon as upstream
- **Current**: Fork from Skeleton (stable baseline), copy ALL Horizon code as starting point
- **Rationale**: Full control, avoid merge conflicts, empower merchants with full section library, organizational behavior alignment

**Impact**: Architectural concepts remain the same (NPM package, build system, override management, etc.). Only base theme source and update strategy changed.

---

## Executive Summary

Publish a core theme as an NPM package (`@agency/shopify-core`) that client themes install as a dependency. This enables continuous core updates via standard npm workflows AND client-specific customizations through overlay files.

**Core Philosophy**: Core theme is an npm dependency, not a Git submodule or monorepo directory. Clients control update timing via semantic versioning.

**Base Theme Strategy**: Fork Shopify's Skeleton theme (minimal baseline structure) and copy ALL Horizon features as starting point. This provides:
- ✅ Stable baseline (Skeleton changes rarely, just structure)
- ✅ Full feature set (all 94 Horizon blocks available to merchants)
- ✅ Complete control (no merge conflicts with Horizon updates)
- ✅ Merchant empowerment (full section library in theme editor)
- ✅ Future flexibility (can prune unused blocks after real-world usage data)

---

## Base Theme Selection: Skeleton + Horizon Copy Strategy

After discussion with CTO, the strategy is to **fork Skeleton and copy Horizon features** rather than forking Horizon directly.

### The Strategy: Skeleton (Structure) + Horizon (Features)

**Fork from Skeleton**:
- ✅ Official Shopify baseline for building custom themes
- ✅ Minimal structure (layout, templates, basic sections)
- ✅ Stable (changes rarely, only structural updates)
- ✅ Clear upstream: Skeleton provides baseline, we own features

**Copy Horizon as Starting Point** (one-time):
- ✅ All 94 blocks (testimonials, galleries, product displays, etc.)
- ✅ All 41 sections (product, cart, collection, etc.)
- ✅ Modern cart drawer, mega menu, filtering
- ✅ Proven features (Shopify's official flagship theme)

**Result**: `@agency/shopify-core` = Skeleton structure + Horizon features

---

### Why This Approach (CTO's Reasoning)

**"We're going to diverge from Horizon anyway"**:
- Hanro needs: custom swatches, gender navigation, gift wrap, integrations
- Other clients will need their own customizations
- Trying to stay 1:1 with Horizon creates merge conflicts
- Better to own the code completely

**"Why deal with the hassle of tracking Horizon updates?"**:
- Quarterly Horizon merges would conflict with customizations (product card, cart, header)
- Manual conflict resolution for 25-50 clients is unsustainable
- Missing automatic Horizon updates is acceptable trade-off

**"Stay inline with Skeleton since that's Shopify's baseline"**:
- Skeleton is the official foundation for custom themes
- Skeleton changes are structural (rarely) vs. features (never)
- Low maintenance burden for upstream tracking

**"Merchants should have full section library available"**:
- Horizon's 94 blocks = proven features from millions of stores
- Merchants want drag/drop section library in theme editor
- Selective copy creates "wait for dev ticket" friction
- Full copy empowers merchants to self-serve

---

### Full Copy vs. Selective Copy Decision

**Why Full Copy (All 94 Horizon Blocks)**:

1. **Organizational Behavior**: Agency tends to build custom solutions first without checking if Horizon already has it. Result: duplicate implementations (custom hero + Horizon hero = more maintenance).

2. **Merchant Empowerment**: Blocks architecture designed for merchants to add/remove sections. Full library = self-service. Selective library = dev tickets for each new section.

3. **Claude Code Maintenance**: AI assistance makes large codebases manageable. 10,000 lines vs. 3,000 lines is not a significant burden with AI tools.

4. **Shopify's Curation**: Horizon's 94 blocks based on data from millions of stores. Their curation is likely better than our selective guesses.

5. **Pruning Later**: Can remove unused blocks after 6-12 months of real usage data. Easier to prune than to hunt for what to add.

**Trade-offs Accepted**:
- ⚠️ Larger NPM package (~2-3MB vs ~1MB)
- ⚠️ Miss automatic Horizon security updates (manual porting required)
- ⚠️ More code to understand initially (10,000+ lines)

**Trade-offs Gained**:
- 🎯 Full merchant empowerment (all sections available)
- 🎯 Prevents duplicate work (no custom builds when Horizon has it)
- 🎯 Matches organizational reality (no "check Horizon first" discipline required)
- 🎯 Can prune unused blocks after real-world data

---

### Comparison: Three Approaches

| Approach | Upstream | Feature Updates | Merge Conflicts | Control | Maintenance |
|----------|----------|-----------------|-----------------|---------|-------------|
| **Fork Horizon** (original plan) | Horizon | Automatic (quarterly) | High (conflicts with customizations) | Medium | Shopify shares burden |
| **Fork Skeleton + Copy Horizon** (chosen) | Skeleton | Manual (security only) | None (we own features) | Full | We own all code |
| **Fork Skeleton + Selective Copy** (considered) | Skeleton | Manual (security only) | None | Full | Less code to maintain |

**Chosen**: Fork Skeleton + Full Horizon Copy
- Best balance of merchant empowerment, organizational behavior, and AI-assisted maintenance

---

### Sources
- [Shopify Skeleton Theme](https://github.com/Shopify/skeleton-theme)
- [Skeleton Announcement](https://shopify.dev/changelog/skeleton-theme-is-now-available)
- [Shopify Horizon Theme](https://github.com/Shopify/horizon)
- [Building Custom Themes with Skeleton](https://shopify.dev/docs/storefronts/themes/architecture)

---

## Repository Structure (Separate Git Repos)

### Core Theme Repository
```
shopify-agency-core/                      # Forked from Shopify/skeleton
├── .git/
│   └── remotes/
│       ├── origin/                       # Your fork
│       └── upstream/                     # Shopify/skeleton (structure only)
├── assets/                                # Horizon features (copied)
├── blocks/                                # 94 reusable blocks (from Horizon)
├── sections/                              # 41 sections (from Horizon)
├── snippets/                              # Universal snippets (from Horizon)
├── templates/                             # Base templates (Skeleton + Horizon)
├── config/                                # Settings schema (Skeleton + Horizon)
├── layout/                                # theme.liquid (Skeleton base)
├── locales/                               # i18n files (Skeleton + Horizon)
├── package.json                           # NPM package manifest
│   {
│     "name": "@agency/shopify-core",
│     "version": "1.2.3",
│     "files": ["assets/**", "blocks/**", "sections/**", ...]
│   }
├── .github/workflows/
│   └── publish-to-npm.yml                # Auto-publish on tag
├── CHANGELOG.md                           # Version history
├── CORE.md                                # Core development guide
├── HORIZON_VERSION.md                    # Documents Horizon source version
├── PRUNING_STRATEGY.md                   # Usage tracking, removal process
└── README.md                              # NPM package usage docs
```

### Client Theme Repository (Hanro Example)
```
hanro-theme/                               # github.com/agency/hanro-theme
├── assets/                                # Core + client files (at root for Shopify)
│   ├── product-card.css                  # From core (may be customized)
│   ├── hanro-custom.css                  # Client-specific
│   └── hanro-swatch.js                   # Client-specific
│
├── blocks/                                # Core + client files
│   ├── _testimonials.liquid              # From core
│   └── _hanro-hero.liquid                # Client-specific
│
├── sections/                              # Core + client files
│   ├── header.liquid                     # From core (may be customized)
│   └── hanro-custom-hero.liquid          # Client-specific
│
├── snippets/                              # Core + client files
│   └── product-card.liquid               # From core (may be customized)
│
├── templates/                             # Core + client files
│   └── product.json                      # Client-customized
│
├── config/
│   ├── settings_data.json                # Shopify-managed (merchant edits)
│   └── settings_schema.json              # From core + client extensions
│
├── layout/
│   └── theme.liquid                      # From core (may be customized)
│
├── locales/                               # From core + client translations
│
├── node_modules/
│   └── @agency/
│       └── shopify-core/                 # Core theme (npm installed, source for install script)
│
├── .core-version                          # Tracks installed core version (e.g., "1.2.0")
│
├── package.json
│   {
│     "name": "hanro-theme",
│     "version": "1.0.0",
│     "dependencies": {
│       "@agency/shopify-core": "^1.2.0"  # Core theme dependency
│     },
│     "scripts": {
│       "install-core": "node scripts/install-core.js",
│       "update-core": "node scripts/update-core.js"
│     }
│   }
│
├── scripts/
│   ├── install-core.js                   # Initial install (copies core → root)
│   └── update-core.js                    # Update core (copies new version → root)
│
├── CUSTOMIZATIONS.md                     # Documents client changes
└── README.md
```

**Key Changes from Previous Architecture:**
- ✅ Theme files at repo root (required for Shopify GitHub integration)
- ✅ Core + client files mixed in same directories
- ✅ Install/update scripts replace build script
- ✅ `.core-version` tracks installed core version
- ❌ No `src/` directory (work directly at root)
- ❌ No `build/` directory (root IS the deployable theme)
- ✅ Master branch → Shopify auto-sync (GitHub integration works)
- ✅ Theme editor changes → bot commits to Git (sync works both ways)

---

## NPM Registry: GitHub Packages

**Decision**: ✅ **GitHub Packages** (finalized)

Using GitHub Packages as the private npm registry for `@agency/shopify-core`.

### Why GitHub Packages
- ✅ **Free** for private repos in GitHub org (saves $420/year vs npm Private Packages)
- ✅ **Integrated** with existing GitHub workflow and Actions
- ✅ **Automatic** org member access (no separate account management)
- ✅ **Simple** authentication (PAT tokens, one-time setup per developer)

### Setup

**Core Theme Repository** (`shopify-agency-core/package.json`):
```json
{
  "name": "@agency/shopify-core",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**Developer Setup** (one-time per developer):
```bash
# Generate GitHub PAT with read:packages, write:packages, repo scopes
# GitHub Settings → Developer Settings → Personal Access Tokens

# Configure npm to use GitHub Packages for @agency scope
echo "@agency:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_PAT_HERE" >> ~/.npmrc

# Test authentication
npm login --registry=https://npm.pkg.github.com --scope=@agency
```

**Client Repository Setup** (automatic):
```bash
# Client repos inherit @agency scope registry from developer's ~/.npmrc
npm install @agency/shopify-core@^1.0.0
# Works automatically once developer configured ~/.npmrc
```

### Fallback Plan
If GitHub Packages proves unreliable, migrate to **npm Private Packages** ($7/user/month):
- Change `publishConfig.registry` in package.json
- Update developer `.npmrc` files
- Re-publish package to npm registry
- No code changes needed

---

## How NPM Package + Install Script Architecture Works

### Core vs. Client Code (Mixed at Root)

**Core Theme** (installed from `@agency/shopify-core`):
- ✅ All Horizon blocks library (94 blocks) - copied to root
- ✅ Base sections (hero, product-information, collection-list, etc.) - copied to root
- ✅ Universal snippets (price, card, button) - copied to root
- ✅ Foundation CSS/JS - copied to root
- ✅ Schema settings - copied to root
- 📦 Installed via npm to `node_modules/`, then **copied to root via install script**

**Client Customizations** (at root, mixed with core):
- ✅ New client-specific files (e.g., `blocks/_hanro-hero.liquid`)
- ✅ CSS overrides (e.g., `assets/hanro-custom.css`)
- ✅ Modified core files (e.g., customized `assets/product-card.css`)
- ✅ All files at root (required for Shopify GitHub integration)

**Tracking:**
- `.core-version` file contains current core version (e.g., "1.2.0")
- Client files vs core files identified via Git history
- Modified core files tracked via Git diff

### Install Script (Initial Setup)

```javascript
// scripts/install-core.js (in each client repo)
const fs = require('fs-extra');
const path = require('path');

async function installCore() {
  const coreDir = 'node_modules/@agency/shopify-core';
  const rootDir = '.';

  // Get core version
  const corePkg = await fs.readJson(path.join(coreDir, 'package.json'));
  const coreVersion = corePkg.version;

  console.log(`Installing core theme v${coreVersion}...`);

  // Copy all core files to root
  const filesToCopy = [
    'assets',
    'blocks',
    'sections',
    'snippets',
    'templates',
    'config',
    'layout',
    'locales'
  ];

  for (const dir of filesToCopy) {
    const srcPath = path.join(coreDir, dir);
    const destPath = path.join(rootDir, dir);

    if (await fs.pathExists(srcPath)) {
      await fs.copy(srcPath, destPath, { overwrite: false });
      // overwrite: false means don't overwrite existing client files
      // Only copies files that don't exist yet
    }
  }

  // Save core version
  await fs.writeFile('.core-version', coreVersion);

  console.log('✓ Core theme installed successfully');
  console.log(`✓ Version: ${coreVersion}`);
  console.log('→ Files copied to root (ready for Shopify GitHub sync)');
}

installCore().catch(console.error);
```

```javascript
// scripts/update-core.js (in each client repo)
const fs = require('fs-extra');
const path = require('path');

async function updateCore() {
  const coreDir = 'node_modules/@agency/shopify-core';

  // Get versions
  const currentVersion = (await fs.readFile('.core-version', 'utf8')).trim();
  const corePkg = await fs.readJson(path.join(coreDir, 'package.json'));
  const newVersion = corePkg.version;

  console.log(`Updating core: ${currentVersion} → ${newVersion}`);

  // Copy ALL core files to root (overwrite everything)
  const filesToCopy = ['assets', 'blocks', 'sections', 'snippets', 'templates', 'config', 'layout', 'locales'];

  for (const dir of filesToCopy) {
    const srcPath = path.join(coreDir, dir);
    const destPath = path.join('.', dir);

    if (await fs.pathExists(srcPath)) {
      await fs.copy(srcPath, destPath, { overwrite: true });
      // overwrite: true - copy ALL files, even if client modified
      // Git will show conflicts on merge
    }
  }

  // Update version file
  await fs.writeFile('.core-version', newVersion);

  console.log('✓ Core files updated');
  console.log('⚠️  Review changes with: git status');
  console.log('⚠️  Client-modified files will show as changed');
  console.log('→ Commit and merge to preserve both core updates + client customizations');
}

updateCore().catch(console.error);
```

**How Updates Work:**
1. **Update script copies ALL files** from core (overwrites everything at root)
2. **Git detects changes** (shows which core files were updated)
3. **Merge conflict** if client modified a file that core also updated
4. **Developer resolves** (keeps both client customizations + core updates)
5. **Commit and push** → Shopify GitHub integration syncs automatically

### Customization Patterns

#### Pattern 1: CSS Overrides (Most Common)
```css
/* Core theme: assets/app.css (from @agency/shopify-core) */
:root {
  --color-primary: #000000;
  --font-heading: 'Inter', sans-serif;
}
```

```css
/* Client addition: assets/hanro-custom.css (client-specific) */
:root {
  --color-primary: #232323;  /* Hanro brand color */
  --font-heading: 'Futura', sans-serif;
}
```

**Result**: Both files exist at root. Client CSS loads after core (via theme.liquid order), overrides win via CSS cascade.

#### Pattern 2: New Client-Specific Section
Core provides base `hero.liquid`. Client creates `sections/hanro-hero.liquid` at root. Both available in theme editor (side by side).

#### Pattern 3: Modify Core File
Client needs different product card behavior → modify `assets/product-card.css` at root directly. When core updates, Git merge combines both changes.

---

## Git & Branching Strategy

### Core Theme Repository (shopify-agency-core)

**Git Workflow**:
```
github.com/agency/shopify-agency-core:
  main           → Production-ready core (auto-publishes to npm)
  develop        → Integration branch
  feature/*      → Feature development
  release/v1.2.0 → Release branches (optional)
```

**NPM Publishing Workflow**:
1. Merge PR to `main`
2. Update `package.json` version: `1.2.3`
3. Git tag: `v1.2.3`
4. GitHub Actions auto-publishes to npm registry
5. Clients can now `npm update @agency/shopify-core`

**Versioning**: Semantic versioning (package.json)
- **Major (2.0.0)**: Breaking changes (clients must manually upgrade)
- **Minor (1.2.0)**: New features (backward compatible, auto-updateable with ^)
- **Patch (1.2.3)**: Bug fixes (auto-updateable)

---

### Skeleton Upstream Tracking + Horizon Reference Strategy

**Skeleton Upstream** (Rare structural updates):
```bash
# Core repo is forked from Shopify/skeleton
git remote add upstream https://github.com/Shopify/skeleton.git
git fetch upstream
```

**Skeleton Update Process** (Annual or as-needed):
```bash
# Skeleton changes are rare (structural only, not features)
# Example: Shopify changes theme.liquid structure

# 1. Review Skeleton's changelog
git fetch upstream
git log upstream/main --oneline --since="1 year ago"
# Review: Structural changes only

# 2. Create review branch
git checkout -b review/skeleton-update

# 3. Merge structural changes
git merge upstream/main
# Conflicts should be minimal (structure vs. features)

# 4. Test thoroughly
shopify theme check
# Validate theme structure still valid (files are at root)

# 5. Publish new core version
git checkout main
git merge review/skeleton-update
git tag v1.5.0
npm version minor
npm publish
```

**Frequency**:
- **Skeleton updates**: Annually or less (very stable)
- **Your core updates**: Weekly (52/year)
- **Impact**: 99% of updates are yours, <1% are Skeleton

---

### Horizon Reference Strategy (No Upstream Tracking)

**Horizon is Reference, Not Upstream**:
- Horizon code was copied ONE TIME (initial setup)
- No ongoing Horizon merges
- We own and maintain all Horizon features we copied

**Horizon Version Documentation**:
```markdown
# HORIZON_VERSION.md

Core theme copied from Shopify Horizon v3.2.1
Date: January 2026
Commit: abc123def456
Repository: https://github.com/Shopify/horizon

Copied components:
- All 94 blocks (blocks/)
- All 41 sections (sections/)
- All assets (assets/)
- All snippets (snippets/)
- Settings schema (config/settings_schema.json)

This documentation allows us to:
1. Reference original Horizon code if needed
2. Manually port critical security fixes
3. Track divergence from Horizon
4. Know which Horizon version clients' questions reference
```

**Security Update Process** (Manual, as-needed):
```bash
# If Horizon releases critical security fix:

# 1. Review Horizon changelog
# Visit: https://github.com/Shopify/horizon/releases

# 2. Assess impact on our copied code
# Does the fix affect code we copied?

# 3. Manual port (using Claude Code)
# Read Horizon's fix
# Apply equivalent fix to our codebase
# Test thoroughly

# 4. Publish updated core version
git tag v1.5.1  # Patch version for security
npm publish

# 5. Notify clients to update
```

**Why This Works**:
- ✅ No merge conflicts (we own all code)
- ✅ Full control over features
- ✅ Can diverge without guilt
- ✅ Stable baseline (Skeleton) separate from features (Horizon)
- ✅ Security fixes manual but manageable with AI assistance

---

### Annual Pruning Strategy

**Goal**: Remove unused Horizon blocks after real-world usage data

**Process** (Every December):
```bash
# 1. Generate usage report
# Track which blocks/sections are actually used across all clients

# 2. Candidate list for removal
# Blocks with 0 usage across all clients for 6+ months

# 3. Team review
# "Do we keep for future clients or archive?"

# 4. Remove or archive
mkdir -p archived-blocks/
git mv blocks/_unused-testimonials.liquid archived-blocks/

# 5. Update documentation
# PRUNING_LOG.md: "Removed testimonials block (0 usage, archived)"

# 6. Publish new core version
git tag v2.0.0  # Major version (removed features)
npm publish

# 7. Notify clients (opt-in update)
# Clients on v1.x.x continue working
# Clients wanting v2.0.0 must verify they don't use removed blocks
```

**Benefits**:
- Start generous (all 94 blocks available)
- Prune based on real data (not guesses)
- Lighter codebase over time
- Still have archived code if needed later

### Client Theme Repository (hanro-theme)

**Git Workflow**:
```
github.com/agency/hanro-theme:
  master                   → Live theme (Shopify production)
  staging                  → QA environment
  feature/HAN-###          → Client-specific features (JIRA pattern)
  upgrade/core-v1.3.0      → Core upgrade branches (major versions only)
```

### Weekly Core Update Flow

**Automated with npm + GitHub Actions**:

**Option A: Automatic Minor/Patch Updates** (Recommended)
```yaml
# .github/workflows/auto-update-core.yml
name: Auto-update Core Theme
on:
  schedule:
    - cron: '0 10 * * FRI'  # Every Friday 10 AM
  workflow_dispatch:

jobs:
  update-core:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Update core dependency
        run: |
          npm update @agency/shopify-core
          # Updates to latest ^1.x.x (minor/patch only)

      - name: Run update script
        run: npm run update-core
        # Copies new core files to root

      - name: Validate theme
        run: shopify theme check
        # Theme files are at root (Shopify GitHub integration)

      - name: Commit core update
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add .
          git commit -m "chore: update core to $(cat .core-version)"
          git push origin staging
        # Push to staging branch → Shopify auto-syncs via GitHub integration

      - name: Create PR if changes
        if: success()
        run: |
          git add package.json package-lock.json
          git commit -m "chore: update core to latest version"
          gh pr create --title "Update core theme" --body "Automated core update"
```

**Option B: Manual Updates** (More control)
```bash
# Developer manually updates when ready
cd hanro-theme/

# Create update branch
git checkout -b update/core-v1.3.2

# Update and install
npm update @agency/shopify-core  # Updates to latest ^1.x.x
npm run update-core  # Copies to root

# Review changes
git diff

# Commit update
git add .
git commit -m "Update core to v1.3.2"

# Merge to master
git checkout master
git merge update/core-v1.3.2
# Resolve any conflicts

# Push → Shopify auto-syncs
git push origin master
```

### Handling Core Updates

**Scenario 1: Minor/Patch Update (Clean Update, No Client Changes)**
```bash
# Core publishes v1.2.3 (bug fix)
# Client has "@agency/shopify-core": "^1.2.0"
# Client hasn't modified the files that core updated

git checkout -b update/core-v1.2.3
npm update @agency/shopify-core  # → Installs 1.2.3
npm run update-core  # Copies new core files to root

git add .
git commit -m "Update core to v1.2.3"

git checkout master
git merge update/core-v1.2.3
# No conflicts (client didn't modify affected files)

git push origin master
# Shopify auto-syncs ✅
```

**Scenario 2: Client Modified Core File**
```bash
# Core updates sections/header.liquid
# Client previously modified sections/header.liquid

git checkout -b update/core-v1.2.0
npm update @agency/shopify-core
npm run update-core  # Copies new core version → overwrites client version

git status
# modified: sections/header.liquid

git add .
git commit -m "Update core to v1.2.0"

git checkout master
git merge update/core-v1.2.0
# CONFLICT: sections/header.liquid
# (client's custom menu vs core's update)

# Resolve merge conflict (keep both changes)
git add sections/header.liquid
git commit -m "Merge core v1.2.0 (resolved conflicts)"
```

**Scenario 3: Major Version (Breaking Change)**
```bash
# Core publishes v2.0.0 (breaking changes - removed 20 unused blocks)
# Client has "@agency/shopify-core": "^1.2.0"

npm update @agency/shopify-core  # Stays on 1.x (^ doesn't cross major)

# Manual upgrade required:
git checkout -b upgrade/core-v2.0.0
npm install @agency/shopify-core@^2.0.0
npm run update-core
# Copies v2.0.0 files to root (some blocks removed)

git add .
git commit -m "Upgrade core to v2.0.0"

# Review CHANGELOG for breaking changes
# Test thoroughly

git checkout master
git merge upgrade/core-v2.0.0
# Resolve any conflicts, test thoroughly before merging
```

---

## Developer Workflow

### Working on Core Theme (shopify-agency-core repo)

```bash
# Clone core repo
git clone github.com/agency/shopify-agency-core
cd shopify-agency-core/

# Create feature branch
git checkout -b feature/blocks/testimonials

# Develop with live preview (test changes directly)
shopify theme dev --store=core-development.myshopify.com

# Create new block
mkdir -p blocks/
cat > blocks/_testimonials.liquid << 'EOF'
{% schema %}
{
  "name": "Testimonials",
  "settings": [...]
}
{% endschema %}
EOF

# Validate
shopify theme check

# Commit & PR
git add blocks/_testimonials.liquid
git commit -m "feat: add testimonials block with rating display"
git push origin feature/blocks/testimonials
# → Create PR to main

# After PR approval & merge to main:
# 1. Update package.json version: 1.0.0 → 1.1.0 (new feature = minor bump)
# 2. Git tag: v1.1.0
# 3. GitHub Actions auto-publishes to npm
# 4. Clients can now: npm update @agency/shopify-core
```

### Working on Client-Specific Feature (hanro-theme repo)

```bash
# Clone client repo
git clone github.com/agency/hanro-theme
cd hanro-theme/

# Files are at root (Shopify GitHub integration)
ls
# assets/ blocks/ sections/ config/ layout/ ...

# Create feature branch (JIRA pattern)
git checkout -b feature/HAN-300-custom-hero

# Create new client-specific section (at root)
cat > sections/hanro-hero.liquid << 'EOF'
<!-- Custom hero section for Hanro -->
{% schema %}
{
  "name": "Hanro Hero",
  "settings": [...]
}
{% endschema %}
EOF

# Create client-specific CSS (at root)
cat > assets/hanro-hero.css << 'EOF'
/* Custom hero styles */
.hanro-hero { ... }
EOF

# OR: Customize existing core file
vim assets/product-card.css
# Add Hanro swatch customizations

# No build step needed - files already at root!
# Test with Shopify CLI
shopify theme dev --store=hanro-dev.myshopify.com

# Validate
shopify theme check

# Commit & push
git add sections/hanro-hero.liquid assets/hanro-hero.css
git commit -m "HAN-300: Add custom video hero section"
git push origin feature/HAN-300-custom-hero

# Create PR to master
# After merge → Shopify auto-syncs via GitHub integration ✅
```

**Key Changes:**
- Work directly at root (not in `src/`)
- No build step (files already in Shopify structure)
- Push to GitHub → Shopify auto-syncs
- Theme editor changes → bot commits back to Git

### Updating Client to Latest Core Version

```bash
cd hanro-theme/

# Create update branch
git checkout -b update/core-v1.3.2

# Update npm package
npm update @agency/shopify-core
# Updates: 1.0.0 → 1.3.2

# Run update script (copies new core files to root)
npm run update-core

# Review changes
git status
# Will show all core files that were updated

git diff
# Review what changed in core

# Commit core update
git add .
git commit -m "Update core theme to v1.3.2"

# Merge to master
git checkout master
git merge update/core-v1.3.2

# If conflicts (client modified files that core also updated):
# Resolve merge conflicts - keep BOTH changes
# (Client customizations + Core updates)

git add .
git commit -m "Merge core v1.3.2 (resolved conflicts)"

# Push to master
git push origin master
# Shopify GitHub integration auto-syncs ✅

# Test on Shopify
# Visit: https://hanro.myshopify.com/?preview_theme_id=master
```

**Conflict Resolution Example:**
```bash
# If assets/product-card.css has conflict:
vim assets/product-card.css

# Shows:
# <<<< HEAD (client changes)
# .hanro-swatch { custom styles }
# ====
# .product-card { core bug fix }
# >>>> update/core-v1.3.2

# Resolve: Keep BOTH
# .hanro-swatch { custom styles }    ← Client
# .product-card { core bug fix }     ← Core

git add assets/product-card.css
# Continue merge
```

---

## Customization Management (Git-Based)

### How Customizations Work

With the install script architecture, client customizations happen directly at the repo root. Git tracks everything:

**Two types of customizations:**
1. **New client files** (not from core) - e.g., `blocks/_hanro-hero.liquid`
2. **Modified core files** (from core, customized) - e.g., `assets/product-card.css`

**Git handles all tracking** - no complex manifest system needed!

### Tracking Client Customizations

**Use Git to identify customizations** (no manifest needed):
```bash
# See what files client has customized
git log --oneline --all -- assets/product-card.css
# Shows: "HAN-123: Add color swatch functionality"

# See client-specific files (not from core)
git log --diff-filter=A --oneline -- blocks/_hanro-hero.liquid
# Shows: "HAN-200: Add custom hero block"

# See which core files were modified
git diff <initial-install-commit> HEAD --name-only
# Lists all files changed since core install
```

**Documentation in Git commits** (no separate manifest):
```bash
# When customizing core file:
git commit -m "HAN-123: Customize product card for swatch functionality

Modified core file: assets/product-card.css
Reason: Add Hanro color swatch system
Notes: Integrates with acdc-sib-swatch.js"

# When adding new file:
git commit -m "HAN-200: Add custom hero section

New file: sections/hanro-hero.liquid
Reason: Custom video hero for campaigns"
```

**Benefits:**
- ✅ Git history documents WHY each customization exists
- ✅ Git blame shows who made changes
- ✅ No manual tracking system to maintain
- ✅ Standard developer workflow

### Helper Scripts (Optional)

**Simple utilities for common tasks**:
**Add to `package.json`**:
```json
{
  "scripts": {
    "install-core": "node scripts/install-core.js",
    "update-core": "node scripts/update-core.js",
    "diff-core": "git diff node_modules/@agency/shopify-core/"
  }
}
```

### Script: Diff Against Core

**See what changed compared to core:**
```bash
# Compare a file against current core version
git diff node_modules/@agency/shopify-core/assets/product-card.css assets/product-card.css

# Shows what client changed compared to core
```

### Common Workflows

**See all client customizations:**
```bash
# List all files changed since initial core install
git diff <initial-install-commit> HEAD --name-only

# See detailed changes
git diff <initial-install-commit> HEAD
```

**Check if file was modified from core:**
```bash
# Compare your version vs core version
diff assets/product-card.css node_modules/@agency/shopify-core/assets/product-card.css

# If different → client customized
# If same → unchanged from core
```

**Document customization in Git:**
```bash
# Always document WHY in commit messages
git commit -m "HAN-123: Customize product card for swatch functionality

Modified: assets/product-card.css (from core)
Changes: Added Hanro color swatch system
Notes: Integrates with acdc-sib-swatch.js"
```

**This approach:**
- ✅ Uses Git (standard developer tool, no custom tracking)
- ✅ Git history shows all customizations
- ✅ Git diff shows client changes vs core
- ✅ Git merge handles core updates + client changes
- ✅ Simple (no manifest files, no custom scripts)

## Theme Editor Support (Merchants Can Still Customize)

**The Challenge**: Merchants customize via Shopify admin. How do we preserve edits during core updates?

**Solution**: Config files (`config/`, `templates/`) are **client-owned**, never overwritten.

### What Happens During Core Updates

1. **New sections/blocks** → Available in theme editor automatically
2. **Merchant's settings** → Preserved in `settings_data.json` (untouched)
3. **Breaking changes** → Manual opt-in (major version only)

### Merchant Experience

- ✅ Drag/drop sections on pages
- ✅ Edit text, images, colors in editor
- ✅ Changes save to client config (safe from core updates)
- ✅ New core features appear in section library (opt-in)

---

## Risks & Mitigation

### Risk 1: Merge Conflicts (Client Overrode Core File)

**Likelihood**: High | **Impact**: Medium

**Mitigation**:
- Build script logs all overridden files
- CHANGELOG highlights file changes
- Developer reviews warnings quarterly
- Minimize Liquid overrides, prefer CSS/JS

### Risk 2: Breaking Changes in Core

**Likelihood**: Low | **Impact**: High

**Mitigation**:
- Semantic versioning (major = breaking)
- Deprecation warnings (2 releases before removal)
- Migration guides with automated fixes
- Staged rollouts (pilot clients first)

### Risk 3: Merge Conflicts on Core Updates

**Likelihood**: Medium | **Impact**: Medium

**Mitigation**:
- Git merge workflow (standard, familiar to devs)
- Update branches (test before merging to master)
- Clear documentation (how to resolve common conflicts)
- Core update frequency controlled (batch changes, reduce merge frequency)
- CHANGELOG with detailed migration guides

### Risk 4: Core Update Merge Burden (50 Clients)

**Likelihood**: Medium | **Impact**: Medium

**Mitigation**:
- Control core update frequency (monthly vs weekly, batch changes)
- Stratify clients: light customizers (rare conflicts) vs heavy customizers (frequent conflicts)
- Automated testing (GitHub Actions runs theme check on staging)
- Clear merge conflict resolution guides
- Consider: Heavy customizers might fork core (manage their own version)

---

## Critical Files to Implement

These 5 files form the "backbone" of the NPM package system:

### Core Theme Repository (shopify-agency-core)

1. **`shopify-agency-core/package.json`**
   NPM package manifest. Defines package name, version, files to publish, and npm registry config.
   ```json
   {
     "name": "@agency/shopify-core",
     "version": "1.0.0",
     "files": ["assets/**", "blocks/**", "sections/**", ...],
     "publishConfig": {
       "registry": "https://npm.pkg.github.com"
     }
   }
   ```

2. **`shopify-agency-core/.github/workflows/publish-to-npm.yml`**
   GitHub Actions workflow that auto-publishes to npm on Git tag.
   ```yaml
   on:
     push:
       tags: ['v*']
   jobs:
     publish:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: npm publish
   ```

3. **`shopify-agency-core/CORE.md`**
   Core development guide. Documents what belongs in core vs. clients, contribution guidelines.

### Client Theme Repository (hanro-theme)

4. **`hanro-theme/scripts/install-core.js`**
   Install script that copies core files from node_modules to repo root.
   Initial setup for new client projects.

5. **`hanro-theme/scripts/update-core.js`**
   Update script that copies new core version to root for core updates.
   Handles core version updates.

6. **`hanro-theme/.core-version`**
   Simple text file tracking installed core version (e.g., "1.2.0").

### Bonus: Auto-update Workflow

7. **`hanro-theme/.github/workflows/auto-update-core.yml`**
   Optional automated core update workflow. Runs update-core script and commits to staging branch for review.

---

## Success Metrics

Track post-migration:

- **Development Velocity**: Time to ship core feature to all clients < 1 week
- **Code Duplication**: Lines of duplicated code < 5%
- **Deployment Frequency**: Core updates 1-2x/month (controlled)
- **Update Success Rate**: Core updates merge cleanly > 80% of time
- **GitHub Integration**: Master → Shopify sync working 100%
- **Performance**: Lighthouse scores ≥ 85 (all clients)
- **Developer Satisfaction**: "NPM package + install script system makes job easier" > 80% agree

---

## Architecture Benefits

✅ **Shopify GitHub Integration**: Master branch auto-syncs to live theme
✅ **Theme Editor Sync**: Merchant changes commit back to Git automatically
✅ **Continuous Updates**: Core releases via npm, clients update via install script
✅ **Customization Freedom**: Clients modify any file, Git merge preserves both changes
✅ **Merchant Control**: Full section library (94 blocks) available in theme editor
✅ **Developer Velocity**: Shared improvements in core, reduced duplication
✅ **Standard Workflow**: Git merge for updates (familiar to all developers)
✅ **Future-Proof**: Skeleton baseline (stable) + Horizon features (modern)

---

## Questions & Clarifications

**Q: What if a client needs a feature that doesn't fit the core theme?**
A: Build it directly in their repo (e.g., `sections/hanro-hero.liquid`). Core stays generic, client gets custom feature without affecting other clients. Client files are committed to their Git repo alongside core files.

**Q: How do we handle third-party app integrations (Klaviyo, Intelligems)?**
A: Client-specific integrations go in their repo (JS files, Liquid snippets at root). If multiple clients need same integration, consider adding to core with feature flag.

**Q: Can clients stay on older core versions?**
A: Yes. `package.json` specifies core version with semver range (e.g., `^1.2.0`). Clients control when to update. Major versions require manual upgrade.

**Q: What if we need to unpublish the npm package?**
A: npm allows unpublish within 72 hours. After that, publish a new version with fixes. Use private registry (GitHub Packages) for more control.

**Q: What happens if update script fails?**
A: Update branch shows errors, doesn't merge to master. Developer fixes issue, retries. Master branch (and live theme) unaffected. Can discard update branch and retry.

**Q: How do we train team on this workflow?**
A: Create `CONTRIBUTING.md` with examples, run workshop session, pair programming for first features, document in Confluence.

**Q: How do we get Horizon updates from Shopify?**
A: We don't track Horizon as upstream. Core theme is forked from Skeleton (structure) with all Horizon features copied once. If Horizon releases critical security fixes, we manually port them. We prioritize independence over automatic updates.

**Q: What if a Horizon update breaks our core theme?**
A: Review in separate branch first (`review/horizon-v3.3.0`), test thoroughly before merging to main. If breaking, don't merge - wait for Shopify fix or adapt our customizations.

---


## Critical Decisions Before Starting

These decisions must be made before Week 1 begins:

### 1. GitHub Packages Authentication

**Decision**: ✅ **Individual PATs with Role-Based Permissions** (finalized)

Each of the 5 developers generates their own Personal Access Token (PAT) with role-appropriate permissions.

**Permission Structure**:

**All 5 Developers** - Read Access:
- **Scopes**: `read:packages`, `repo`
- **Can**: Install core theme (`npm install @agency/shopify-core`)
- **Can**: Write code, create PRs, contribute features (Git access)
- **Cannot**: Publish new versions to npm

**1-2 Senior Developers** - Write Access (Release Managers):
- **Scopes**: `read:packages`, `write:packages`, `repo`
- **Can**: Everything above PLUS publish releases (`npm publish`)
- **Responsible for**: Version bumps, changelogs, release timing

**Why This Approach**:
- ✅ Everyone can contribute code (Git permissions separate from npm publish)
- ✅ Only seniors release packages (prevents accidental publishes)
- ✅ Audit trail (know who published which version)
- ✅ Security (individual tokens, revoke individually)
- ✅ No shared credentials (each dev has their own PAT)

**Setup Steps** (Per Developer, 5 mins one-time):
```bash
# 1. Generate PAT on GitHub
# Go to: GitHub Settings → Developer Settings → Personal Access Tokens → Generate new token
# Scopes:
#   - read:packages (all developers)
#   - write:packages (only release managers: 1-2 senior devs)
#   - repo (all developers)
# Copy token (only shown once!)

# 2. Create .npmrc in home directory (~/.npmrc)
echo "@agency:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN_HERE" >> ~/.npmrc

# 3. Test authentication
npm whoami --registry=https://npm.pkg.github.com
# Should show your GitHub username
```

**For CI/CD** (GitHub Actions):
```yaml
# Uses built-in GITHUB_TOKEN (has write:packages automatically in workflows)
- name: Setup npm auth
  run: |
    echo "@agency:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc
```

**Security Best Practices**:
- ✅ Store PAT in `~/.npmrc` (never commit to Git)
- ✅ Add `.npmrc` to global `.gitignore`
- ✅ Rotate PATs every 6-12 months
- ✅ Revoke PAT immediately when developer leaves
- ✅ Use fine-grained PATs (limit to specific repos)

---

### 2. Client Development/Staging Strategy (General)

**Question**: How to test client theme rebuilds without affecting live stores?

**Shopify Approach** (No Traditional Staging):
Shopify doesn't have "staging servers." Instead, use **unpublished themes** on the live store.

**How Unpublished Themes Work**:
```bash
# Shopify allows up to 20 themes per store:
# - 1 "Live" theme (published, what customers see)
# - 19 "Unpublished" themes (preview-only)

# Push client rebuild as unpublished theme
cd client-theme/build/
shopify theme push --unpublished --theme="Theme Rebuild - Dev"

# Get preview URL
shopify theme list
# Output shows preview URL with theme ID parameter

# Preview URL example: https://store.myshopify.com/?preview_theme_id=123456
```

**Workflow** (Recommended for All Clients):
1. **Developer testing**: Use `shopify theme dev` (live reload on localhost)
2. **Team QA**: Push as unpublished theme → share preview URL
3. **Client review**: Client tests via preview URL (real data, not customer-facing)
4. **Go live**: Publish theme → becomes live

**What This Means**:
- ✅ Uses real store data (products, orders, customers) - accurate testing
- ✅ NOT visible to customers (requires preview URL parameter)
- ✅ Can have multiple unpublished themes (dev, staging, QA)
- ⚠️ Shares same data (changes to products affect all themes)
- ⚠️ Can't test checkout without real orders (use test mode)

**Recommendation**: Unpublished themes sufficient for client rebuilds - no separate staging server needed

**Needs confirmation**: Team comfortable with this workflow?

---

### 3. Initial Core Theme State

**Decision**: ✅ **Vanilla Copy** (finalized)

Core theme v1.0.0 will be: **Skeleton structure + Horizon features (copied as-is, zero modifications)**

### Why Vanilla Copy
- ✅ **Fast publish** (2-3 days vs 5-7 days)
- ✅ **Full feature set** immediately (all 94 Horizon blocks)
- ✅ **Clean baseline** for future customizations
- ✅ **Learn from Hanro** what agency features are actually needed
- ✅ **Iterate based on real needs** (not speculation)

### What This Means

**v1.0.0** (Week 1):
- Skeleton structure (layout, templates)
- All 94 Horizon blocks (unmodified)
- All 41 Horizon sections (unmodified)
- All Horizon assets, snippets, configs (unmodified)
- Published to npm immediately

**v1.1.0+** (Weeks 6+, after Hanro learnings):
- Add: Gift wrap block (learned from Hanro)
- Add: Custom variant picker (learned from Hanro)
- Add: Agency-specific enhancements
- Iterate based on real client needs

### Implementation Timeline
- **Day 1-2**: Fork Skeleton, copy Horizon, publish v1.0.0 (vanilla)
- **Week 2-6**: Hanro migration (uses vanilla v1.0.0 as base)
- **Week 6+**: Extract proven features from Hanro to core (v1.1.0, v1.2.0)

---

## Core Theme Specific Prerequisites

These decisions and validations are specific to setting up the core theme (before Hanro migration begins):

### 1. Skeleton + Horizon Copy Process (Day 0 - Before Starting)

**Action**: Understand both Skeleton and Horizon structures before copying

**Step 1: Fork Skeleton**
```bash
# On GitHub: Fork Shopify/skeleton to agency/shopify-agency-core
# Clone your fork
git clone github.com/agency/shopify-agency-core
cd shopify-agency-core

# Add Skeleton as upstream
git remote add upstream https://github.com/Shopify/skeleton.git
git fetch upstream

# Examine Skeleton structure
ls -la
# Expected: Basic structure only (layout/, templates/, minimal sections/)
```

**Step 2: Clone Horizon for Copying**
```bash
# Clone Horizon to separate directory (use main branch)
git clone https://github.com/Shopify/horizon.git /tmp/horizon-copy-source
cd /tmp/horizon-copy-source

# Record exact commit for provenance
git rev-parse HEAD
# Example output: 2ceba3a06fcac943eca631510e58ec1c96f88a39
# Save this SHA for HORIZON_VERSION.md

# Examine structure
tree -L 2
# Note: blocks/, sections/, assets/, snippets/, config/

# Check for dependencies
cat package.json
# Note any dependencies we need to handle

# Identify demo/placeholder content
grep -r "example\|demo\|placeholder" .
# Any dummy data to exclude from copy?
```

**Step 3: Copy Horizon into Skeleton Fork**
```bash
cd /path/to/shopify-agency-core

# Copy Horizon features (preserving Skeleton structure)
cp -r /tmp/horizon-copy-source/blocks/ ./blocks/
cp -r /tmp/horizon-copy-source/sections/* ./sections/
cp -r /tmp/horizon-copy-source/assets/* ./assets/
cp -r /tmp/horizon-copy-source/snippets/* ./snippets/

# Merge config files (Horizon + Skeleton settings)
# Manual review: Keep Skeleton's base, add Horizon's settings

# Commit with provenance
git add .
git commit -m "Copy Horizon v3.2.1 features into Skeleton base

Copied from: https://github.com/Shopify/horizon
Commit: [Horizon commit SHA]
Date: January 2026

Copied:
- All 94 blocks
- All 41 sections
- Assets, snippets, configs

Preserved Skeleton:
- Layout structure
- Template structure
- Base theme.liquid
"
```

**Decision needed**: Which Horizon files to exclude (demos, examples)?

---

### 2. npm Package Configuration (Critical)

**Decision**: What files to publish in npm package?

**Recommended package.json**:
```json
{
  "name": "@agency/shopify-core",
  "version": "1.0.0",
  "description": "Agency core Shopify theme based on Horizon",
  "repository": "github.com/agency/shopify-agency-core",
  "license": "MIT",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "files": [
    "assets/**",
    "blocks/**",
    "sections/**",
    "snippets/**",
    "templates/**",
    "config/**",
    "layout/**",
    "locales/**",
    "!**/.DS_Store",
    "!**/node_modules"
  ],
  "keywords": ["shopify", "theme", "horizon"],
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Explicitly EXCLUDE**:
- ❌ `.git/` directory
- ❌ Horizon's original `README.md` (create your own)
- ❌ Horizon's `package.json` (replaced with yours)
- ❌ Any `node_modules/` (if Horizon has dependencies)
- ❌ `.github/` workflows from Horizon (use your own)

**Create YOUR files**:
- ✅ `README.md` - Your core theme documentation
- ✅ `CORE.md` - Development guidelines
- ✅ `CHANGELOG.md` - Version history
- ✅ `package.json` - Your npm package manifest

**Needs decision**: Confirm file inclusion list

---

### 3. Test npm Package Install BEFORE Client (Day 2-3)

**Critical Test**: Verify Shopify theme works when installed via npm

**Test Sequence**:
```bash
# Day 2: After forking Skeleton and copying Horizon

# 1. Test local npm pack
npm pack
# Creates: agency-shopify-core-1.0.0.tgz

# 2. Test install in temp directory
mkdir /tmp/test-npm-theme
cd /tmp/test-npm-theme
npm install /path/to/agency-shopify-core-1.0.0.tgz

# 3. Verify structure
ls -la node_modules/@agency/shopify-core/
# Should show: assets/, blocks/, sections/, etc.
# Should NOT show: .git/, original README.md, etc.

# 4. Test Shopify CLI recognizes it
cd node_modules/@agency/shopify-core/
shopify theme check
# Should pass: "✓ Valid theme"

# 5. Test deploy to dev store
shopify theme push --unpublished --store=test.myshopify.com
# Should work: Theme uploads successfully

# 6. Test in browser
# Visit preview URL - does Horizon theme work?
```

**If any step fails**: Fix before publishing to npm registry or creating Hanro client

**Needs validation**: Complete this test sequence Day 2-3

---

### 4. Horizon Upstream Remote Setup (Day 1)

**Action**: Configure Git remotes correctly from start

**Setup**:
```bash
# After forking Skeleton on GitHub

# Clone YOUR fork
git clone https://github.com/agency/shopify-agency-core.git
cd shopify-agency-core/

# Check current remotes
git remote -v
# origin: github.com/agency/shopify-agency-core (your fork)

# Add Skeleton as upstream
git remote add upstream https://github.com/Shopify/skeleton-theme.git
git fetch upstream

# Clone Horizon for copying
git clone https://github.com/Shopify/horizon.git /tmp/horizon-copy-source

# Copy Horizon features
cp -r /tmp/horizon-copy-source/blocks/ ./blocks/
cp -r /tmp/horizon-copy-source/sections/* ./sections/
cp -r /tmp/horizon-copy-source/assets/* ./assets/
cp -r /tmp/horizon-copy-source/snippets/* ./snippets/

# Document source versions for provenance
SKELETON_SHA=$(git rev-parse HEAD)
HORIZON_SHA=$(cd /tmp/horizon-copy-source && git rev-parse HEAD)

cat > HORIZON_VERSION.md << EOF
# Core Theme Source Documentation

Created: $(date)

## Base Structure (Skeleton)
- Repository: https://github.com/Shopify/skeleton-theme
- Branch: main
- Commit: $SKELETON_SHA

## Features (Horizon)
- Repository: https://github.com/Shopify/horizon
- Branch: main
- Commit: $HORIZON_SHA

## Components Copied from Horizon
- All 94 blocks (blocks/)
- All 41 sections (sections/)
- All assets (assets/)
- All snippets (snippets/)
- Templates, config, locales

## Notes
Neither Skeleton nor Horizon use semantic versioning (both use main branch).
This file documents exact commit SHAs for provenance and future reference.
EOF

# Verify
git remote -v
# origin: github.com/agency/shopify-agency-core (fetch/push)
# upstream: github.com/Shopify/skeleton-theme (fetch only)

# Tag starting point
git tag v1.0.0
git push origin v1.0.0
```

**Critical**: Set up Skeleton upstream and copy Horizon on Day 1

**Needs validation**: Verify setup before continuing

---

### 5. Skeleton + Horizon License Compliance (Legal)

**Question**: Both Skeleton and Horizon are MIT licensed - can you fork Skeleton and copy Horizon code?

**Check Both LICENSE Files**:
- **Skeleton**: MIT License (allows forking and redistribution)
- **Horizon**: MIT License (allows copying and redistribution)
- Must retain original copyright notices for both
- Must include copies of both licenses

**Recommendation**:
```bash
# In your core theme:
# Keep both LICENSE files

# LICENSE-SKELETON
# [Skeleton's original MIT license]

# LICENSE-HORIZON
# [Horizon's original MIT license]

# LICENSE (Your Core Theme)
# "Based on Shopify's Skeleton theme (structure) and Horizon theme (features)"
# "Both licensed under MIT - see LICENSE-SKELETON and LICENSE-HORIZON"
# [Your agency's copyright for customizations]
```

**Needs decision**: Legal review? (MIT is very permissive - dual attribution likely sufficient)

---

### 6. Core Theme Version Strategy

**Decision**: ✅ **Semantic Versioning (SemVer)** (finalized)

Core theme versions are independent from both Skeleton and Horizon, following standard Semantic Versioning: `MAJOR.MINOR.PATCH`

### Version Format

**MAJOR.MINOR.PATCH** (e.g., `v1.2.3`):
- **MAJOR** (`v2.0.0`): Breaking changes, removed features, requires manual client upgrade
- **MINOR** (`v1.2.0`): New features, backward compatible, clients auto-update with `^`
- **PATCH** (`v1.2.3`): Bug fixes, performance improvements, clients auto-update with `^`

### Version Examples

- `v1.0.0` = Initial release (Skeleton + Horizon v3.2.1 copy, no modifications)
- `v1.1.0` = Added gift wrap block (new feature, minor bump)
- `v1.1.1` = Fixed cart bug (bug fix, patch bump)
- `v1.2.0` = Added testimonials block (new feature, minor bump)
- `v2.0.0` = Removed 20 unused blocks (breaking change, major bump)

### Client Update Behavior

**Client package.json:**
```json
{
  "dependencies": {
    "@agency/shopify-core": "^1.0.0"
  }
}
```

**With `^1.0.0` (caret range):**
- ✅ Auto-updates: `v1.1.0`, `v1.2.0`, `v1.999.0` (minor/patch)
- ❌ Does NOT auto-update: `v2.0.0` (major/breaking)
- Clients must manually upgrade to v2.x.x

### Release Process

**Feature Release** (Minor):
```bash
# Add new feature
git commit -m "feat: add testimonials block"

# Bump version
npm version minor  # 1.0.0 → 1.1.0

# Push with tags
git push && git push --tags

# GitHub Actions publishes automatically
```

**Bug Fix** (Patch):
```bash
git commit -m "fix: cart drawer closing issue"
npm version patch  # 1.1.0 → 1.1.1
git push && git push --tags
```

**Breaking Change** (Major):
```bash
git commit -m "BREAKING: removed unused blocks (see PRUNING_LOG.md)"
npm version major  # 1.5.0 → 2.0.0
git push && git push --tags
# Clients stay on v1.x.x, must manually upgrade
```

### Documentation Format

**CHANGELOG.md:**
```markdown
## v1.2.0 - 2026-02-15

### Added
- Testimonials block with rating display
- Gift wrap option in cart drawer

### Changed
- Enhanced product card with hover effects
- Improved mobile navigation performance

### Fixed
- Cart drawer not closing on mobile
- Product gallery thumbnail alignment

### Horizon Reference
- Based on: Horizon v3.2.1 (no changes)
- Manually ported: Horizon security fix #456
```

**HORIZON_VERSION.md:**
```markdown
# Core Theme Version History

## v1.0.0 (January 2026)
- Base: Skeleton (commit abc123)
- Features: Horizon v3.2.1 (commit def456)
- Status: Full copy, zero modifications

## v1.2.0 (February 2026)
- Added: Gift wrap block, testimonials block
- Modified: Cart drawer (free shipping bar)
- Horizon: No updates (still v3.2.1)

## v2.0.0 (January 2027)
- BREAKING: Removed 20 unused blocks
- Modified: Product card (major refactor)
- Horizon: Manually ported security fixes
```

### Why Semantic Versioning
- ✅ npm ecosystem standard
- ✅ Clients understand update safety (`^` range)
- ✅ Clear communication (major = breaking)
- ✅ Tooling support (`npm version`, `npm outdated`)
- ✅ Industry best practice

---

### 7. npm Package File Selection (Skeleton + Horizon)

**Decision**: ✅ **Finalized**

Using `"files"` whitelist in package.json for explicit control.

**package.json configuration:**
```json
{
  "name": "@agency/shopify-core",
  "version": "1.0.0",
  "files": [
    "assets/**",
    "blocks/**",
    "sections/**",
    "snippets/**",
    "templates/**",
    "config/**",
    "layout/**",
    "locales/**",
    "HORIZON_VERSION.md",
    "LICENSE-SKELETON",
    "LICENSE-HORIZON",
    "PRUNING_STRATEGY.md",
    "README.md",
    "!**/.DS_Store",
    "!**/node_modules",
    "!**/.git",
    "!**/.github"
  ]
}
```

**What gets published to npm:**
- ✅ All theme directories (complete Shopify theme structure)
- ✅ Documentation (HORIZON_VERSION.md, licenses, pruning strategy)
- ✅ README.md (agency-created npm package documentation)
- ❌ package.json (npm includes automatically, stays in node_modules)
- ❌ .github/ workflows (client repos have their own)
- ❌ Original Skeleton/Horizon READMEs (replaced with ours)

**What clients get when installing:**
```
node_modules/@agency/shopify-core/
  assets/
  blocks/
  sections/
  snippets/
  templates/
  config/
  layout/
  locales/
  HORIZON_VERSION.md
  LICENSE-SKELETON
  LICENSE-HORIZON
  PRUNING_STRATEGY.md
  README.md
  package.json  ← npm metadata (not copied to client root)
```

**install-core.js copies everything EXCEPT package.json** to client root

---

### 8. npm Package Test Before Publishing

**Critical**: Test `npm pack` → `npm install` → Shopify deploy sequence BEFORE publishing to registry

**Test Workflow** (Day 2-3):
```bash
# In shopify-agency-core/

# 1. Create test package
npm pack
# Output: agency-shopify-core-1.0.0.tgz

# 2. Install in temp directory
mkdir /tmp/test-core-install
cd /tmp/test-core-install
npm init -y
npm install /path/to/shopify-agency-core/agency-shopify-core-1.0.0.tgz

# 3. Verify theme structure intact
ls -la node_modules/@agency/shopify-core/
# Should show: assets/, blocks/, sections/, config/, layout/, locales/, templates/, snippets/

# 4. Verify Shopify CLI recognizes theme
cd node_modules/@agency/shopify-core/
shopify theme check
# Expected: ✓ Theme valid

# 5. Test deploy to Shopify dev store
shopify theme push --unpublished --store=core-test.myshopify.com
# Expected: Theme uploads successfully

# 6. Test in browser
# Visit preview URL
# Expected: Horizon theme renders correctly
```

**If ANY step fails**:
- Fix package.json "files" configuration
- Fix file structure issues
- Re-test before publishing to npm registry

**Why this matters**: If npm package is broken, ALL client repos will fail `npm install`

**Needs validation**: Complete test before Day 4

---

### 9. GitHub Actions npm Publish Configuration

**Critical**: GitHub Actions needs proper authentication and permissions

**Setup Required**:

**Step 1**: Enable GitHub Actions in repository settings
- Repo Settings → Actions → Allow Actions

**Step 2**: Grant workflow write permissions
- Repo Settings → Actions → Workflow permissions → "Read and write permissions"

**Step 3**: Create publish workflow
```yaml
# .github/workflows/publish-to-npm.yml
name: Publish to GitHub Packages

on:
  push:
    tags:
      - 'v*'  # Triggers on version tags (v1.0.0, v1.1.0, etc.)

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@agency'

      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Step 4**: Test workflow
```bash
# Create test tag
git tag v1.0.0-test
git push origin v1.0.0-test

# Check GitHub Actions tab
# Should see: "Publish to GitHub Packages" workflow running
# Should succeed: Package published

# Cleanup test
git tag -d v1.0.0-test
git push origin :refs/tags/v1.0.0-test
npm unpublish @agency/shopify-core@1.0.0-test
```

**Needs validation**: Test GitHub Actions workflow on Day 3 before real v1.0.0 publish

---

### 10. Core Theme Development Store (Optional)

**Question**: Do you need `core-development.myshopify.com` for testing core theme changes?

**Analysis**:
- Core theme is Horizon (works standalone on any Shopify store)
- Core changes get tested when clients rebuild (Hanro dev theme)
- Separate dev store adds overhead (manage another store)

**Recommendation**: **Not necessary** - Test core changes on Hanro's dev theme

**Alternative**: If you want isolation, create dev store via Shopify Partner account (free), but adds complexity

**Needs decision**: Skip core dev store? Or create one?

---

## Summary: Critical Path to Day 1

**Pre-Day 1** (This Week):
1. ✅ **Examine Horizon repo** - Understand structure, dependencies, files
2. ✅ **Make Critical Decisions** (listed above) - Repo strategy, versioning, file inclusion
3. ✅ **Setup GitHub Packages** - PAT tokens, authentication
4. ✅ **Confirm Shopify access** - Partner account, can create dev stores

**Day 1** (Can Start):
5. ✅ **Fork Skeleton + Copy Horizon** - Setup upstream remote, copy Horizon features, tag starting point
6. ✅ **Create package.json** - File inclusion list, npm config
7. ✅ **Create documentation** - README, CORE.md, CHANGELOG

**Day 2-3** (Critical Testing):
8. ✅ **Test npm pack/install** - Verify theme works when installed via npm
9. ✅ **Test Shopify deploy** - Verify theme deploys from node_modules
10. ✅ **Test GitHub Actions** - Verify automated publish works

**Day 4** (Publish for Real):
11. ✅ **Tag v1.0.0** - Trigger real publish
12. ✅ **Verify published** - Check GitHub Packages, test install

**Day 5** (Hanro Setup):
13. ✅ **Create Hanro client repo** - Install core via install script, test Shopify GitHub sync

---

**Verified Repositories**:
- **Skeleton**: [github.com/Shopify/skeleton-theme](https://github.com/Shopify/skeleton-theme) (MIT License)
  - No version tags (uses main branch)
  - 38 commits
  - Latest commit: `04069e0` (as of Jan 2026)

- **Horizon**: [github.com/Shopify/horizon](https://github.com/Shopify/horizon) (MIT License)
  - No version tags (uses main branch)
  - 34 commits
  - Latest commit: `2ceba3a` (as of Jan 2026)
  - Created: July 2025

**Decision**: ✅ **Fork from main branch, document commit SHA**
- Both repos use continuous development (no semantic versions)
- Fork from main, record exact commit SHA in HORIZON_VERSION.md
- Example: "Based on Skeleton main@04069e0 + Horizon main@2ceba3a"

---

## Pre-Implementation Checklist

### Gap 7: .npmignore vs package.json "files" ⚠️

**The Problem**: Two ways to control what gets published to npm:

**Option A**: Use `"files"` in package.json (whitelist)
```json
{
  "files": ["assets/**", "blocks/**", ...] // Only these included
}
```

**Option B**: Use `.npmignore` (blacklist)
```
# .npmignore
.git
.github
*.md
node_modules
```

**Recommendation**: Use `"files"` (whitelist) - More explicit, safer

**But**: Plan doesn't show this clearly

---

### Gap 8: GitHub Actions Secrets for npm Publish ⚠️ BLOCKER

**The Problem**: GitHub Actions needs PAT to publish to GitHub Packages

**Current plan shows**:
```yaml
# .github/workflows/publish-to-npm.yml
- run: npm publish
```

**Missing**: How does GitHub Actions authenticate?

**Solution**:
```yaml
# .github/workflows/publish-to-npm.yml
name: Publish to npm

on:
  push:
    tags: ['v*']

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@agency'

      - name: Configure npm auth
        run: |
          echo "@agency:registry=https://npm.pkg.github.com" >> .npmrc
          echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc

      - name: Publish package
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Critical**: `GITHUB_TOKEN` is auto-provided by GitHub Actions (no manual setup needed)

**But**: Need to grant GitHub Actions workflow `write:packages` permission in repo settings

**Needs action**: Configure repo permissions for GitHub Actions

---

### Gap 9: What if npm Publish Fails? ⚠️

**Scenario**: You tag v1.0.0, GitHub Actions tries to publish, fails

**Current plan doesn't address**:
- Can you retry? (Yes, but must delete tag and recreate)
- Does failed publish leave broken package? (No, nothing published)
- How do you debug?

**Recommendation - Add to plan**:
```bash
# If npm publish fails:

# 1. Check GitHub Actions logs for error

# 2. Fix issue locally

# 3. Delete failed tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0

# 4. Re-tag and push
git tag v1.0.0
git push origin v1.0.0

# 5. GitHub Actions runs again
```

---

### Gap 10: Horizon Repository Location ⚠️ ASSUMPTION

**The Problem**: Plan assumes `https://github.com/Shopify/horizon.git`

**But**: Is this the official Horizon repo?

Let me verify:

<function_calls>
<invoke name="WebSearch">
<parameter name="query">Shopify Horizon theme official GitHub repository URL

Before starting Week 1, ensure these prerequisites are in place:

### Infrastructure & Access (Must Have Before Day 1)

**GitHub Organization**:
- [ ] GitHub organization exists
- [ ] Team members added with appropriate permissions
- [ ] Can create new repositories

**Shopify Partner Account**:
- [ ] Shopify Partner account active
- [ ] Can create development stores (for testing core theme)
- [ ] Shopify CLI installed on developer machines: `npm install -g @shopify/cli`
- [ ] Shopify CLI authenticated: `shopify auth login`
- [ ] Can create development stores via Shopify Partner account (for testing core theme)

---

### Team Readiness

**Developer Environment**:
- [ ] Node.js v18+ installed on all machines
- [ ] npm and Git configured

**Communication**:
- [ ] Project communication channel (Slack/Teams)
- [ ] Use existing HAN JIRA project for tracking

---

## Immediate Next Steps

### Core System Setup (Week 1)

1. **Day 1-2: Initialize Core Theme Repository**
   - Fork Skeleton theme on GitHub (github.com/agency/shopify-agency-core forked from Shopify/skeleton)
   - Clone your fork locally
   - Add Skeleton as upstream remote: `git remote add upstream https://github.com/Shopify/skeleton-theme.git`
   - Clone Horizon to separate directory for copying: `/tmp/horizon-copy-source`
   - Copy ALL Horizon features into Skeleton fork (blocks, sections, assets, snippets)
   - Document Horizon version in `HORIZON_VERSION.md`
   - Tag starting point: `git tag v1.0.0`
   - Setup package.json for npm package
   - Choose npm registry (GitHub Packages recommended)
   - Publish v1.0.0 to npm

   **Result**: Core theme = Skeleton structure + Horizon features (full copy), published as npm package

2. **Day 3: Setup CI/CD**
   - Create `.github/workflows/publish-to-npm.yml`
   - Test automated publishing (tag → npm publish)
   - Create CHANGELOG.md and CORE.md documentation

3. **Day 4: Test with Dummy Client**
   - Create test client repo
   - Install `@agency/shopify-core`
   - Create install-core.js and update-core.js scripts
   - Test install script → files at root
   - Connect to Shopify via GitHub integration
   - Validate master branch → Shopify auto-sync works

4. **Day 5: Finalize Documentation**
   - Write README for core theme
   - Write CONTRIBUTING.md
   - Document override management system
   - Train team on new workflow

### Next: Client Migration

See `hanro-migration.md` for detailed Hanro migration plan.

---

## Verification Plan

After implementing the core theme system, verify:

### NPM Package System
- [ ] Core theme publishes to npm registry successfully
- [ ] Test client repo installs `@agency/shopify-core` via npm
- [ ] `npm run install-core` copies core files to root
- [ ] Theme passes `shopify theme check` at root
- [ ] Theme files at root work with Shopify GitHub integration
- [ ] Master branch → Shopify auto-syncs

### Core Updates Workflow
- [ ] Make change to core theme repo
- [ ] Update package.json version + git tag
- [ ] GitHub Actions auto-publishes to npm
- [ ] Client runs `npm update @agency/shopify-core`
- [ ] Client rebuilds with new core version
- [ ] New core features available in theme editor

### Skeleton Upstream Tracking + Horizon Reference
- [ ] Core theme has upstream remote pointing to Shopify/skeleton-theme
- [ ] Can fetch Skeleton updates: `git fetch upstream` (rarely needed)
- [ ] Horizon version documented in `HORIZON_VERSION.md`
- [ ] Can reference Horizon for security fixes (manual port)
- [ ] Tag tracks core version: `v1.5.0`

### Client Customizations
- [ ] Create client override file (e.g., `src/assets/custom.css`)
- [ ] Build includes override file
- [ ] Core file NOT overwritten by client file (precedence correct)
- [ ] Theme editor still functional
- [ ] Merchant can customize via theme editor

### Customization Management (Git-Based)
- [ ] `npm run install-core` copies core files to root
- [ ] `npm run update-core` updates core files (overwrites all)
- [ ] Git diff shows client customizations vs core
- [ ] Git merge handles core updates + client changes
- [ ] `.core-version` file tracks installed core version

### Documentation
- [ ] README.md explains npm package usage
- [ ] CORE.md documents what belongs in core
- [ ] CONTRIBUTING.md has developer workflows
- [ ] CHANGELOG.md tracks version history
- [ ] Example client repo demonstrates usage

---

**Next Steps**: See `hanro-migration.md` for client migration plan.

---

**End of Plan**
