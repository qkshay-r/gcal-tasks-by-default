# Google Calendar: Tasks by Default

A minimal Chrome extension that opens the Google Calendar quick-create dialog on the **Task** tab instead of Event — every time, with no flicker.

---

## The problem

Every time you click a date or time slot in Google Calendar, the dialog opens on *Event* by default. If you mostly create tasks, that's an extra click, every single time.

## What this does

Intercepts the dialog the moment it's added to the DOM — before it's painted — switches to the Task tab, then reveals it. You never see the switch happen.

No UI. No settings. No toolbar icon. Just install it and forget about it.

---

## Installation

Chrome doesn't allow unpacked extensions from the web store without review, so you'll load it manually. It takes about 30 seconds.

1. Download or clone this repo
2. Go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the repo folder
5. Open [calendar.google.com](https://calendar.google.com) — done

---

## How it works

Two files. That's the whole extension.

**`content.js`** — injects a CSS rule that sets `opacity: 0` on any dialog node the instant it lands in the DOM. Then uses `requestAnimationFrame` to click the Task tab and remove the hide class — all before the browser paints the first frame.

**`manifest.json`** — declares the content script and scopes permissions to `calendar.google.com` only. Nothing else.

---

## Maintenance

Google Calendar is a live web app and can update its DOM structure at any time. If the extension stops working after a Google Calendar update, the most likely fix is updating the tab selector in `content.js`.

The relevant line:
```js
if (/^task$/i.test(label))
```

This matches the tab whose `aria-label` or text content is `"Task"`. If Google renames or restructures the tabs, open an issue or submit a PR with the updated selector — it's a one-line fix.

---

## Contributing

PRs are welcome, especially for:
- Broken selectors after a Google Calendar update
- Firefox / Edge compatibility
- Anything that keeps the code this small

Please keep the scope narrow. This does one thing and should stay that way.

---

## License

MIT
