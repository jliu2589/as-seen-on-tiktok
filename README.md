# Mandarin Context Player (MVP)

This prototype focuses on your requested learning flow:

- user uploads a Mandarin video,
- video plays in a large left panel,
- a right panel shows context visuals in sync with playback.

## Features

- **Video upload** (`video/*`) from local device.
- **Two-screen layout**:
  - large video area on the left,
  - live context panel on the right.
- **Playback-synced cues**:
  - each cue has Hanzi, pinyin, English hint, and visual chips (emoji/graphics labels),
  - cue highlights update as the video time passes cue timestamps.

## Run locally

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173`

## Current demo behavior

The cue timeline is seeded with example Mandarin lines and timestamps (`app.js`).
When the video reaches each timestamp, the right-side visuals update automatically.

## Next build steps

1. Parse real subtitles from uploaded file or associated transcript.
2. Auto-generate cue timestamps from subtitle timing.
3. Replace visual chips with image retrieval (e.g. icons/photos).
4. Add learner modes (hide/show hints, pinyin toggle, replay by cue).
