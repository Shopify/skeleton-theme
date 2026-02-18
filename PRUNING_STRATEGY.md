# Block Pruning Strategy

## Goal

Remove unused Horizon blocks after accumulating real-world usage data across client stores. Start generous (all 94 blocks), prune based on evidence.

## Timeline

- **Months 1-6**: No pruning. Collect usage data across client deployments.
- **Month 6+**: First review eligible. Only prune blocks with zero usage across all clients.
- **Annually (December)**: Formal review cycle.

## Annual Review Process

1. **Generate usage report**: Identify which blocks/sections are used across all client stores.
2. **Identify candidates**: Blocks with zero usage across all clients for 6+ months.
3. **Team review**: Decide keep (future potential) vs. archive (no foreseeable use).
4. **Archive**: Move to `archived-blocks/` directory (preserves code, removes from package).
5. **Publish major version**: Removed features = breaking change = major version bump.
6. **Notify clients**: Clients on previous major version continue working unaffected.

## Tracking Usage

Usage can be tracked by:
- Searching client repos for block references in template JSON files
- Reviewing Shopify admin theme customizer usage across stores
- Checking `settings_data.json` across client repos for block type references

## Archive Strategy

```bash
# Move unused block to archive (stays in git history)
mkdir -p archived-blocks/
git mv blocks/_unused-block.liquid archived-blocks/

# Document removal
# Update CHANGELOG.md with removal note
# Update this file with removal log below
```

Archived blocks are excluded from the npm package but remain in the repository for reference.

## Removal Log

| Block | Removed In | Reason | Archived |
|-------|-----------|--------|----------|
| (none yet) | - | - | - |
