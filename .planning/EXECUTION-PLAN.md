# Core Theme System - Implementation Execution Plan

**Project**: Build core Shopify theme as NPM package for multi-client deployment
**Base**: Skeleton (structure) + Horizon (features, full copy)
**Architecture**: Install script pattern (core files copied to client repo root)
**Registry**: GitHub Packages (private npm)

---

## Executive Summary

Core theme published as npm package (`@agency/shopify-core`). Client repos install via npm, then run install script to copy theme files to root (required for Shopify GitHub integration). Updates via `npm update` + update script + Git merge.

**Key Constraints**:
- ✅ Theme files MUST be at repo root (Shopify GitHub integration requirement)
- ✅ Master branch auto-syncs to Shopify (no build/ directory allowed)
- ✅ Theme editor commits back to Git (two-way sync)

**Architecture**: Install script copies core → root. Updates via Git merge (preserves client customizations).

---

## Plan Approach

This plan uses a **hybrid approach** for implementation details:

**Exact commands** (copy/paste ready):
- Standard git operations (`git clone`, `git tag`, `git commit`)
- Directory operations (`cp`, `mkdir`)
- npm commands (`npm install`, `npm version`)
- Shopify CLI commands (`shopify theme check`)

**Requirements + pseudocode** (adapt during execution):
- Script implementations (install-core.js, update-core.js)
- Configuration files (package.json examples provided as reference)
- Documentation content (requirements listed, not exact text)

**Why**: Standard operations are well-tested and unlikely to need changes. Complex implementations may need refinement when you encounter real context during execution. Requirements ensure you capture the right functionality while allowing flexibility in implementation.

---

## Day-by-Day Execution Plan

### Prerequisites (Before Day 1)
- [ ] GitHub org exists, team has access
- [ ] Shopify Partner account active
- [ ] Shopify CLI installed: `npm install -g @shopify/cli`
- [ ] Node.js 18+ on all machines
- [ ] Generate GitHub PAT: Settings → Developer Settings → Personal Access Tokens → `read:packages`, `repo`
- [ ] Configure npm auth (each developer):
  ```bash
  echo "@agency:registry=https://npm.pkg.github.com" >> ~/.npmrc
  echo "//npm.pkg.github.com/:_authToken=YOUR_PAT_HERE" >> ~/.npmrc
  ```

---

### Day 1: Initialize Core Repository

**Goal**: Fork Skeleton + copy Horizon features

```bash
# 1. Fork Skeleton on GitHub
# Go to: https://github.com/Shopify/skeleton-theme
# Click "Fork" → Create fork in your org: github.com/agency/shopify-agency-core

# 2. Clone YOUR fork
git clone https://github.com/agency/shopify-agency-core.git
cd shopify-agency-core/

# 3. Add Skeleton as upstream
git remote add upstream https://github.com/Shopify/skeleton-theme.git
git fetch upstream

# 4. Clone Horizon for copying
cd /tmp
git clone https://github.com/Shopify/horizon.git horizon-copy-source
cd horizon-copy-source
HORIZON_SHA=$(git rev-parse HEAD)
echo "Horizon commit: $HORIZON_SHA"  # Save this

# 5. Copy Horizon features to your core repo
cd ~/shopify-agency-core/  # Adjust path
cp -r /tmp/horizon-copy-source/blocks ./blocks
cp -r /tmp/horizon-copy-source/sections/* ./sections/
cp -r /tmp/horizon-copy-source/assets/* ./assets/
cp -r /tmp/horizon-copy-source/snippets/* ./snippets/
# Review config/ - merge Horizon settings with Skeleton base (manual)

# 6. Document source versions
SKELETON_SHA=$(git rev-parse HEAD)
cat > HORIZON_VERSION.md << EOF
# Core Theme Source Documentation

Created: $(date)

## Base (Skeleton)
- Repo: https://github.com/Shopify/skeleton-theme
- Commit: $SKELETON_SHA

## Features (Horizon)
- Repo: https://github.com/Shopify/horizon
- Commit: $HORIZON_SHA

## Copied Components
- All 94 blocks (blocks/)
- All 41 sections (sections/)
- Assets, snippets, templates, config, locales

## Notes
v1.0.0 is vanilla copy (zero modifications).
Future versions will add agency customizations.
EOF

# 7. Commit Horizon copy
git add .
git commit -m "feat: copy Horizon features into Skeleton base

Copied from Shopify Horizon commit $HORIZON_SHA
All 94 blocks, 41 sections, assets, snippets.
Zero modifications - vanilla copy for v1.0.0."

# 8. Push to GitHub
git push origin main
```

**Validate**:
- [ ] `ls blocks/` shows ~94 files
- [ ] `ls sections/` shows ~41 files
- [ ] `git log` shows Skeleton commits + your Horizon copy commit
- [ ] HORIZON_VERSION.md exists with correct commit SHAs

**If fails**: Verify GitHub fork exists, remotes correct, Horizon clone succeeded

---

### Day 2: NPM Package Configuration

**Goal**: Configure package.json for npm publishing

#### 1. Create package.json

**Requirements**:
- Package name: `@agency/shopify-core`
- Version: `1.0.0`
- Registry: GitHub Packages (`https://npm.pkg.github.com`)
- Include all theme directories in published package
- Exclude: `.DS_Store`, `node_modules`, `.git`, `.github`

**Example structure** (adapt as needed):
```json
{
  "name": "@agency/shopify-core",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "files": [
    "assets/**", "blocks/**", "sections/**", "snippets/**",
    "templates/**", "config/**", "layout/**", "locales/**",
    "HORIZON_VERSION.md", "PRUNING_STRATEGY.md"
  ]
}
```

#### 2. Create Documentation Files

**README.md** must include:
- Package name and purpose
- Installation instructions (`npm install` + `npm run install-core`)
- Update instructions (`npm update` + `npm run update-core`)
- Architecture summary (Skeleton + Horizon)
- Link to detailed docs

**CHANGELOG.md** must include:
- v1.0.0 release notes
- What's included (Skeleton + Horizon vanilla copy)
- Source commit SHAs
- Note about zero modifications

**PRUNING_STRATEGY.md** must include:
- Goal: Remove unused blocks after 6-12 months
- Annual review process
- How to track usage
- Archive strategy (preserve code in `archived-blocks/`)

#### 3. Create the Files

Create package.json, README.md, CHANGELOG.md, and PRUNING_STRATEGY.md based on the requirements above.

```bash
cd shopify-agency-core/

# Create each file with content meeting the requirements above
# Adapt examples as needed for your specific context
```

#### 4. Test Package Structure

Verify the npm package is correctly configured before publishing.

```bash
# Test npm pack
npm pack
# Creates: agency-shopify-core-1.0.0.tgz

# Test install in temp directory
mkdir -p /tmp/test-npm-theme
cd /tmp/test-npm-theme
npm init -y
npm install ~/shopify-agency-core/agency-shopify-core-1.0.0.tgz

# Verify structure
ls -la node_modules/@agency/shopify-core/
# Should show: assets/, blocks/, sections/, snippets/, templates/, config/, layout/, locales/

# Validate theme with Shopify CLI
cd node_modules/@agency/shopify-core/
shopify theme check
# Expected: "✓ Theme is valid"
```

#### 5. Commit Configuration

**Validate**:
- [ ] package.json has correct "files" whitelist
- [ ] `npm pack` creates .tgz without errors
- [ ] Test install shows correct directory structure
- [ ] `shopify theme check` passes
- [ ] No .git/, .github/, or other excluded files in tarball

**If fails**:
- Check "files" array in package.json
- Verify theme structure matches Shopify requirements
- Run `tar -tzf agency-shopify-core-1.0.0.tgz | less` to inspect contents

**Commit**:
```bash
cd ~/shopify-agency-core/
git add package.json README.md CHANGELOG.md PRUNING_STRATEGY.md
git commit -m "chore: add npm package configuration"
git push origin main
```

---

### Day 3: GitHub Actions & First Publish

**Goal**: Automate publishing, test with v1.0.0

```bash
cd shopify-agency-core/

# 1. Create GitHub Actions workflow
mkdir -p .github/workflows
cat > .github/workflows/publish-to-npm.yml << 'EOF'
name: Publish to GitHub Packages

on:
  push:
    tags:
      - 'v*'  # Triggers on v1.0.0, v1.1.0, etc.

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
EOF

# 2. Commit workflow
git add .github/workflows/publish-to-npm.yml
git commit -m "ci: add automated npm publish workflow"
git push origin main

# 3. Grant GitHub Actions workflow permissions
# Go to: GitHub repo → Settings → Actions → General
# Workflow permissions: "Read and write permissions" → Save

# 4. Test with test tag (dry run)
git tag v1.0.0-test
git push origin v1.0.0-test

# 5. Check GitHub Actions
# Go to: GitHub repo → Actions tab
# Should see "Publish to GitHub Packages" workflow running
# Wait for completion (green checkmark)

# 6. Verify test publish
npm view @agency/shopify-core@1.0.0-test
# Should show package metadata

# 7. Cleanup test
git tag -d v1.0.0-test
git push origin :refs/tags/v1.0.0-test
npm unpublish @agency/shopify-core@1.0.0-test --force

# 8. Publish v1.0.0 FOR REAL
git tag v1.0.0
git push origin v1.0.0

# 9. Wait for GitHub Actions (check Actions tab)

# 10. Verify published
npm view @agency/shopify-core@1.0.0
npm info @agency/shopify-core
```

**Validate**:
- [ ] GitHub Actions workflow exists in repo
- [ ] Workflow permissions set to "Read and write"
- [ ] Test tag triggers workflow successfully
- [ ] `npm view` shows package published
- [ ] v1.0.0 published and accessible

**If fails**:
- Check GitHub Actions logs for errors
- Verify PAT has `write:packages` scope
- Verify .npmrc configured correctly
- Check workflow permissions in repo settings

---

### Day 4: Client Repo Template & Install Script

**Goal**: Create client repo template, test install workflow

#### 1. Create Test Client Repo

```bash
# Create test client repo on GitHub
# Go to: GitHub org → New repository
# Name: "test-client-theme"
# Private, Initialize with README

# Clone client repo
git clone https://github.com/agency/test-client-theme.git
cd test-client-theme/
```

#### 2. Create package.json

```bash
# Create package.json (example structure - adapt as needed)
# Key requirements:
# - Dependency: @agency/shopify-core with ^ range (e.g., ^1.0.0)
# - Scripts: install-core and update-core pointing to scripts/
# - Private: true (client repos are private)

cat > package.json << 'EOF'
{
  "name": "test-client-theme",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@agency/shopify-core": "^1.0.0"
  },
  "scripts": {
    "install-core": "node scripts/install-core.js",
    "update-core": "node scripts/update-core.js"
  }
}
EOF

# Install core theme via npm
npm install
# Installs @agency/shopify-core to node_modules/
```

#### 3. Create Install Script (scripts/install-core.js)

**Requirements**:
- Check if `@agency/shopify-core` exists in node_modules (error if not)
- Read core version from core package.json
- Copy these directories from core to root: `assets`, `blocks`, `sections`, `snippets`, `templates`, `config`, `layout`, `locales`
- Don't overwrite existing client files (preserve client customizations)
- Save core version to `.core-version` file at root
- Show progress (which directories copied)
- Handle errors gracefully (exit with error code if fails)

**Pseudocode**:
```javascript
// Use fs-extra for recursive copy with options
// Path: node_modules/@agency/shopify-core → repo root
// For each directory: copy if exists, skip if already exists (overwrite: false)
// Read version from core's package.json
// Write version to .core-version
// Log success with version number
```

**Key considerations**:
- Initial install only (doesn't overwrite existing files)
- Must work when run from package.json script
- Should be idempotent (safe to run multiple times)

#### 4. Create Update Script (scripts/update-core.js)

**Requirements**:
- Read current version from `.core-version`
- Read new version from core package.json
- Copy ALL core directories to root (overwrite: true)
- Update `.core-version` with new version
- Show before/after versions
- Warn user to review changes with `git status`
- Remind about merge conflicts (expected for modified files)

**Pseudocode**:
```javascript
// Read current version from .core-version
// Read new version from core package.json
// For each directory: copy and OVERWRITE (overwrite: true)
// Update .core-version file
// Log update complete + warnings about reviewing git status
```

**Key considerations**:
- Overwrites ALL core files (Git will show changes)
- Client customizations preserved via Git merge (not script logic)
- Should warn about potential merge conflicts

#### 5. Complete Client Setup

```bash
# Install fs-extra dependency
npm install --save-dev fs-extra

# Create the scripts based on requirements above
mkdir -p scripts
# Write install-core.js and update-core.js

# Run install script
npm run install-core

# Verify files copied to root
ls -la
# Should see: assets/, blocks/, sections/, snippets/, templates/, config/, layout/, locales/, .core-version

# Check .core-version
cat .core-version
# Should show: 1.0.0

# Validate theme
shopify theme check
# Should pass: Theme is valid

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.shopifyignore
.DS_Store
*.log
.env
EOF

# Commit initial setup
git add .
git commit -m "chore: initial client repo setup with core v1.0.0"
git push origin main
```

**Validate**:
- [ ] Core files copied to root successfully
- [ ] `.core-version` file shows "1.0.0"
- [ ] `shopify theme check` passes
- [ ] All theme directories at root (not in subdirectories)
- [ ] Scripts run without errors

**If fails**:
- Check npm install succeeded
- Verify @agency/shopify-core exists in node_modules
- Check script syntax (Node.js errors)
- Verify file paths correct

---

### Day 4 (continued): Shopify GitHub Integration Test

**Goal**: Verify GitHub → Shopify auto-sync works

```bash
cd test-client-theme/

# 1. Connect repo to Shopify store
# In Shopify Admin:
# - Online Store → Themes
# - Add theme → Connect from GitHub
# - Select: agency/test-client-theme, branch: main
# - Theme Name: "Test Core Integration"

# 2. Wait for Shopify to sync (1-2 minutes)
# Shopify will pull main branch and deploy as unpublished theme

# 3. Verify theme appears in Shopify
# Shopify Admin → Themes
# Should see: "Test Core Integration" (unpublished)

# 4. Test GitHub → Shopify sync
# Make a small change locally
echo "/* Test sync */" >> assets/base.css
git add assets/base.css
git commit -m "test: verify GitHub → Shopify sync"
git push origin main

# Wait 30-60 seconds

# 5. Verify change in Shopify
# Shopify Admin → Themes → Test Core Integration → Edit code
# Open assets/base.css
# Should see "/* Test sync */" at bottom

# 6. Test Shopify → GitHub sync
# In Shopify theme editor:
# - Make a change (e.g., edit a section)
# - Save
# - Wait 1-2 minutes

# Check Git commits
git pull origin main
git log --oneline -5
# Should see commit from "Shopify GitHub Bot"

# 7. Cleanup test commit
git revert HEAD~1  # Revert test sync commit
git push origin main
```

**Validate**:
- [ ] Shopify connected to GitHub repo
- [ ] Theme appears in Shopify admin
- [ ] Local commits appear in Shopify (GitHub → Shopify)
- [ ] Theme editor changes commit to Git (Shopify → GitHub)
- [ ] Two-way sync working

**If fails**:
- Verify repo is public OR Shopify has GitHub App access
- Check Shopify admin for sync errors
- Verify branch name is "main" (not "master")
- Re-connect GitHub integration in Shopify admin

---

### Day 5: Documentation & Finalization

**Goal**: Finalize documentation, prepare for team

#### 1. Create CORE.md (Development Guidelines)

**Must include**:
- What belongs in core (universal features, Shopify best practices, reusable blocks)
- What stays in client repos (client-specific features, brand styling, third-party integrations)
- Contribution workflow (feature branch → develop → validate → PR → merge → publish)
- Versioning rules (patch/minor/major)
- Publishing process (`npm version` + `git push --tags` triggers GitHub Actions)

#### 2. Update README.md (Main Documentation)

**Must include**:
- Package name and description
- Architecture summary (Skeleton + Horizon, npm package, install script pattern)
- For clients:
  - Installation instructions (`npm install` + `npm run install-core`)
  - Update instructions (`npm update` + `npm run update-core`)
- For core developers:
  - Link to CORE.md
  - Publishing workflow (`npm version` + push tags)
- Documentation index (links to CORE.md, CHANGELOG.md, etc.)
- Support channels (Slack, JIRA)

#### 3. Create CONTRIBUTING.md (Contributor Guide)

**Must include**:
- Step-by-step development workflow
- Local development setup (`shopify theme dev`)
- Validation steps (`shopify theme check`)
- Commit message format (conventional commits)
- PR process
- Publishing after merge

#### 4. Finalize and Publish

```bash
# Commit all documentation
git add CORE.md README.md CONTRIBUTING.md
git commit -m "docs: add development and contribution guidelines"
git push origin main

# Create GitHub release for v1.0.0
# Go to: GitHub repo → Releases → Create new release
# Tag: v1.0.0
# Title: "v1.0.0 - Initial Release"
# Description: Summarize what's included (Skeleton + Horizon, zero mods)
```

**Validate**:
- [ ] All documentation files created
- [ ] README clear and covers both client and developer workflows
- [ ] CORE.md defines boundaries (core vs client)
- [ ] CONTRIBUTING.md provides step-by-step instructions
- [ ] GitHub release created for v1.0.0

---

## Post-Implementation Verification

### Test Complete Workflow

```bash
# 1. Install core in new client repo
mkdir test-client-2 && cd test-client-2
git init
npm init -y
npm install @agency/shopify-core@^1.0.0
# Create scripts/ (copy from test-client-theme)
npm run install-core

# 2. Verify installation
ls -la  # Should show theme directories at root
cat .core-version  # Should show "1.0.0"
shopify theme check  # Should pass

# 3. Make client customization
echo ".custom { color: red; }" > assets/custom.css
git add . && git commit -m "chore: initial setup + custom CSS"

# 4. Simulate core update
# (In core repo: make change, bump to v1.1.0, publish)
npm update @agency/shopify-core  # Updates to 1.1.0
npm run update-core  # Copies new version
git status  # Shows core files changed, custom.css unchanged
git add . && git commit -m "chore: update core to v1.1.0"

# 5. Verify both client and core files present
ls assets/
# Should show: core files + custom.css
```

### Success Criteria

- [ ] Core publishes to GitHub Packages
- [ ] Clients install core via npm
- [ ] Install script copies files to root
- [ ] Theme passes Shopify validation
- [ ] Shopify GitHub integration syncs both ways
- [ ] Core updates merge cleanly with client changes
- [ ] Documentation is clear and actionable

---

## Common Issues & Solutions

### npm install fails
```bash
# Check authentication
npm whoami --registry=https://npm.pkg.github.com

# Verify .npmrc
cat ~/.npmrc
# Should contain:
# @agency:registry=https://npm.pkg.github.com
# //npm.pkg.github.com/:_authToken=ghp_YOUR_PAT
```

### Theme check fails
```bash
# Common issue: Files in wrong location
# Fix: Ensure theme files at root (not in subdirectories)

# Validate structure
shopify theme check --verbose
# Read errors, fix file structure
```

### Shopify GitHub sync not working
```bash
# Check GitHub App connection in Shopify admin
# Settings → Apps and sales channels → GitHub → Reconnect

# Verify repo visibility
# Private repos require GitHub App access
# Public repos work without extra config
```

### Install script fails
```bash
# Check if core is installed
ls node_modules/@agency/shopify-core/
# If missing: npm install

# Check script syntax
node scripts/install-core.js
# Read error messages, fix Node.js syntax issues
```

### Merge conflicts on core update
```bash
# Expected when client modified core files
# Strategy: Keep BOTH changes

# Example: assets/product-card.css conflict
git status  # Shows conflict
git diff    # Shows both versions

# Edit file: keep client changes + core updates
# Remove conflict markers: <<<<, ====, >>>>

git add assets/product-card.css
git commit -m "merge: resolve core update conflicts"
```

---

## Next Steps

After Day 5 completion:

1. **Hanro Migration**: Begin migrating Hanro theme to use core
   - See separate Hanro migration plan
   - Use as pilot to validate core system

2. **Extract Learnings**: After Hanro migration (Week 6+)
   - Identify agency-specific features worth adding to core
   - Publish v1.1.0+ with proven enhancements

3. **Team Training**: Schedule workshop
   - Core development workflow
   - Client setup workflow
   - Update procedures
   - Troubleshooting

4. **Rollout to Other Clients**: Gradual migration
   - Start with low-complexity clients
   - Learn from each migration
   - Refine process

---

## Summary: 5-Day Timeline

| Day | Goal | Deliverable |
|-----|------|-------------|
| 1 | Initialize repo | Core repo with Skeleton + Horizon |
| 2 | NPM config | package.json, test pack/install |
| 3 | CI/CD | GitHub Actions, v1.0.0 published |
| 4 | Client template | Test client repo, scripts working |
| 5 | Documentation | All docs finalized, team ready |

**Total Effort**: ~5 days for 1 developer, or 2-3 days for 2 developers in parallel

---

**End of Execution Plan**
