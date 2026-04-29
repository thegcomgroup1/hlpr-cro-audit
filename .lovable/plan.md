## Replace placeholder headshots with real photos

Swap five placeholder portraits with the uploaded real photos. Filenames already match what `WallOfLove.tsx` and `FounderSection.tsx` import, so no code changes are needed — just overwriting asset files.

### Asset swaps (overwrite existing)
| Upload | Destination |
|---|---|
| `user-uploads://founder-headshot.png` | `src/assets/founder-headshot.png` |
| `user-uploads://ashleigh-j.jpg` | `src/assets/testimonials/ashleigh-j.jpg` |
| `user-uploads://mike-s.png` | `src/assets/testimonials/mike-s.png` |
| `user-uploads://louis-f.jpg` | `src/assets/testimonials/louis-f.jpg` |
| `user-uploads://gloria-g.png` | `src/assets/testimonials/gloria-g.png` |

### Out of scope
No code or copy changes — Vite will pick up new asset hashes on rebuild.
