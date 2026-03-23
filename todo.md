# TODO - Shopify Skeleton Theme

## Now
- [ ] Verify mobile PLP filters on real devices (open/close/apply/clear/back-forward)
- [ ] Run manual smoke pass: PDP, PLP, cart page, minicart, search drawer
- [ ] Run `theme-check` when local Shopify CLI/Node deps are fixed

## Next
- [ ] P2 cleanup: copy consistency, small interaction polish, remove dead notes

## Done (Latest)
- [x] P0 complete: section rendering foundation, Shopify docs parity, PDP media reliability
- [x] P1 complete except final manual verification
- [x] Search and cart core hardening shipped (predictive drawer, cart notes/attributes)
- [x] PDP recommendations no longer tied to variant switching
- [x] PDP media now keeps variant-primary media first in viewer + thumbnails while keeping shared media
- [x] Core checks passing in this environment: `bun run typecheck`, `bun run build`

## Notes
- `theme-check` is currently unavailable in this environment (`command not found` / local CLI dependency issue)
