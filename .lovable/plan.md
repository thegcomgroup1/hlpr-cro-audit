## Update PortfolioStrip with real screenshots

### Asset swaps (copy uploads → `src/assets/portfolio/`, overwrite existing)
Replace these placeholder PNGs with the real uploads:

| Brand | Upload → Asset |
|---|---|
| Eden Cove | `user-uploads://eden-cove.png` → `eden-cove.png` |
| Voir Homme | `user-uploads://voir-chat.png` → `voir-chat.png` |
| Kaizen Beauty | `user-uploads://kaizen.png` → `kaizen.png` |
| Streaming4YouNow | `user-uploads://streaming.png` → `streaming.png` |
| Dunamis Marketing | `user-uploads://dunamis.png` → `dunamis.png` |
| Real Estate Connect | `user-uploads://realestate.png` → `realestate.png` |
| Koven | `user-uploads://koven.png` → `koven.png` |
| Luna's Place | `user-uploads://lunas-place.png` → `lunas-place.png` |
| LifeWork Ministries | `user-uploads://lifework.png` → `lifework.png` |
| Saved Singles Summit | `user-uploads://saved-singles-summit.png` → `saved-singles-summit.png` |

### Code changes — `src/components/landing/PortfolioStrip.tsx`
1. **Remove Olara**: delete the `olaraProduct` import and its entry from the `PORTFOLIO` array (leaves 10 items).
2. **Update headline count**: change `"11 sites shipped. $1.2M+ in client ad spend optimized."` → `"10+ sites shipped. $1.2M+ in client ad spend optimized."`
3. Leave the `olara-product.png` placeholder file in the assets folder untouched (no longer referenced; harmless and avoids churn for a future re-add).

### Out of scope
- No copy/layout changes elsewhere.
- `FounderSection` still says "Eleven sites live" — leaving alone unless you want it reconciled to "10+" in the next batch.
