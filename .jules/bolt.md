## 2026-07-31 - [Intl.DateTimeFormat Caching in LOIGenerator]
**Learning:** `new Date().toLocaleDateString(...)` is surprisingly slow because it instantiates a new `Intl.DateTimeFormat` object synchronously every time it runs. In a controlled component that updates on every keystroke, formatting dates this way can cause noticeable input lag on the main thread.
**Action:** Always cache `new Intl.DateTimeFormat(...)` outside the component scope and reuse it via `cachedFormatter.format(date)` when formatting dates in frequently re-rendering components.
