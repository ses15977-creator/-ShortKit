# V2 quick place search + AI response hardening

- Added the existing store-name/place search UI to AI Quick Create for food videos.
- Selecting a place fills store name and address through the existing selectPlace flow.
- Hardened `/api/ai` and `/api/places` POST entrypoints so outer authentication/server errors return JSON instead of framework HTML.
- Hardened client response parsing so unexpected HTML responses show a useful Korean error instead of `Unexpected token <`.
- Kept direct store/address input available as a fallback.
