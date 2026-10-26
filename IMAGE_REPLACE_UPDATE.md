# Shortkit v39 - v5 Scene Image Replacement

## Added
- Selected image scene can replace only its source photo from the final editing screen.
- Existing scene subtitle, narration, generated/manual audio, duration, fit, rotation and photo-motion settings are preserved.
- No AI request is made when replacing a photo.
- If the old source image is used only by the selected scene, its asset entry is replaced so the project does not unnecessarily grow.
- If the old source image is shared by other scenes, a new asset is added and only the selected scene is pointed to it.
- Existing 200 MB project storage protection and 12-asset protection remain in effect.

## Not changed
- Database / member / payment logic
- AI planning and voice APIs
- Photo motion v1
- Subtitle quick edit v2
- Duration quick edit v3
- Scene ordering v4
