"""Responsive browser regression: run against Vite preview with Playwright installed.

Start: npm run build && npm run preview -- --host 127.0.0.1 --port 4191
Run:   python tests/mobile-overflow.playwright.py
Override: PORTFOLIO_URL=https://... python tests/mobile-overflow.playwright.py
"""
import json
import os

from playwright.sync_api import sync_playwright

URL = os.environ.get("PORTFOLIO_URL", "http://127.0.0.1:4191/shubham-portfolio/")
VIEWPORTS = (320, 375, 390, 600, 768, 1280)


def main():
    results = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        for width in VIEWPORTS:
            page = browser.new_page(viewport={"width": width, "height": 850})
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            response = page.goto(URL, wait_until="networkidle", timeout=30000)
            result = {
                "viewport": width,
                "http_status": response.status,
                "scroll_width": page.evaluate("document.documentElement.scrollWidth"),
                "nav_links_visible": page.locator(".nav a:visible").count(),
                "mailto_links": page.locator('a[href^="mailto:"]').count(),
                "portrait_width": page.locator(".portrait-photo").evaluate("(img) => img.naturalWidth"),
                "page_errors": errors,
            }
            results.append(result)
            assert result["http_status"] == 200, result
            assert result["scroll_width"] <= width, result
            assert result["nav_links_visible"] == 4, result
            assert result["mailto_links"] >= 1, result
            assert result["portrait_width"] == (320 if width <= 480 else 560), result
            assert not errors, result
            page.close()
        browser.close()
    print(json.dumps(results, indent=2))
    print(f"RESPONSIVE_BROWSER_PASS {len(results)}/{len(VIEWPORTS)}")


if __name__ == "__main__":
    main()
