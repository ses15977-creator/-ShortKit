# Shortkit V2.0.20 Final Deploy QA

## Scope
Final pre-deploy review of the V2 flow after V2.0.19. No new product feature was added. This pass focuses on release readiness, recovery behavior, and critical flow consistency.

## Static checks completed
- TypeScript/TSX/MTS syntax transpile audit: 121 source files passed with 0 syntax errors.
- AI quick-create JSON parsing has HTML-response protection.
- Place search JSON parsing has HTML-response protection and direct-entry fallback.
- Project changes invalidate previous rendered output and completion state.
- Platform/format changes invalidate previous rendered output and completion state.
- Score ring uses the live draft score value for its conic-gradient progress.
- Four export presets are wired: Shorts, Reels, TikTok, archive WebM.
- Upload readiness, publish package, final completion, and retry UI are connected.
- Project auto-save, before-unload warning, backup, and draft resume code paths are present.
- Shortkit logo home reset and guide editor-return fixes remain present.
- Category image cards and food place search remain present.

## Issue found and fixed in V2.0.20
### Offline render retry
The recovery banner intentionally enables render retry even while offline because rendering is performed on the device. However, `retryFailedAction()` previously returned early whenever `online === false`, so the enabled button could do nothing. V2.0.20 now permits `render` retry while offline, while AI planning and TTS retries still require a network connection.

## Flow matrix reviewed
- Categories: food / product / travel / information.
- Quick create: category -> assets -> optional place selection -> AI plan -> result.
- Manual edit: scene subtitle position -> subtitle text -> narration text -> scene TTS.
- Result: draft score -> recommendations -> quick fixes -> platform selection.
- Publishing: CTA -> caption/hashtags -> title/thumbnail -> readiness checklist -> package copy.
- Export: Shorts MP4 / Reels MP4 / TikTok MP4 / archive WebM.
- Recovery: AI plan retry / failed TTS scene retry / render retry / offline notice / draft resume.

## Requires live deployment/device verification
These cannot be honestly completed in this container because the project ZIP has no installed `node_modules` and there are no live service credentials/browser deployment bindings here:
- Full `pnpm build` / framework production build.
- Full ESLint run with project dependencies.
- Live Gemini plan and TTS requests.
- Live Kakao/Gemini place search provider behavior.
- Real MP4/WebM render playback on target browsers.
- iPhone/Android share-sheet and file download behavior.
- shortkit.kr custom-domain production route/API verification.

## Recommended production smoke test
1. Food: search a store, select result, upload 3 assets, quick-create, edit one narration, regenerate one scene voice, export Shorts MP4.
2. Product: quick-create, switch Reels -> TikTok, verify score/recommendations update, export MP4.
3. Travel: edit subtitle position top/center/bottom on mobile, save/reopen project, export.
4. Information: create a longer script, run quick fixes, verify category/platform score behavior.
5. Disconnect network: verify offline banner; AI/TTS retry disabled; local render retry still works.
6. Force/reproduce API failure: verify Korean recovery message and one-click retry.
7. Modify project after rendering: verify old output disappears and must be rendered again.
8. Complete title/caption/hashtags/CTA: verify readiness reaches complete and package copy contains no duplicate CTA/hashtags.
