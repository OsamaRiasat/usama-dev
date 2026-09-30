// Captures the README screenshots in .github/assets/ from a running production build.
//
//   npm run build && npx next start -p 3124   (in another terminal)
//   npm run shots
//
// Env: BASE_URL (default http://localhost:3124), CHROME_PATH (default: macOS Google Chrome).
// PNGs are converted to JPEG with macOS `sips`; elsewhere the PNGs are kept.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import puppeteer from "puppeteer-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3124";
const OUT = new URL("../.github/assets/", import.meta.url).pathname;
const profileDir = mkdtempSync(join(tmpdir(), "shots-"));
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  userDataDir: profileDir,
  args: ["--hide-scrollbars"],
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(path, { w = 1440, h = 900, theme = "dark", scale = 2 } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: scale });
  await page.evaluateOnNewDocument((t) => localStorage.setItem("theme", t), theme);
  await page.goto(BASE + path, { waitUntil: "networkidle0" });
  await wait(1500);
  return page;
}

// Scroll so `sel` sits `off` px from the top (negative = below the fixed nav), then let reveals finish.
async function scrollTo(page, sel, off) {
  await page.evaluate((s, o) => window.scrollTo(0, document.querySelector(s).getBoundingClientRect().top + window.scrollY + o), sel, off);
  await wait(1800);
}

const shots = [];
const snap = async (page, name) => {
  await page.screenshot({ path: `${OUT}${name}.png` });
  shots.push(name);
};

// Desktop, dark
let p = await open("/");
await p.waitForFunction(() => document.querySelector("#top p span[aria-hidden]")?.textContent.length >= 18, { timeout: 15000 });
await p.mouse.move(1000, 420);
await p.mouse.move(1040, 440, { steps: 10 });
await wait(400);
await snap(p, "hero");
await p.mouse.move(10, 10);
await scrollTo(p, "#services .grid", -110);
await wait(700);
await snap(p, "capabilities");
await scrollTo(p, "#work article", -150);
await snap(p, "projects");
await scrollTo(p, "#approach h2", -130);
await p.hover("#approach li:nth-child(5) button");
await wait(700);
await snap(p, "approach");
await scrollTo(p, "#experience", 60);
await snap(p, "experience");
await p.keyboard.down("Meta");
await p.keyboard.press("k");
await p.keyboard.up("Meta");
await wait(500);
await p.keyboard.type("deft");
await wait(400);
await snap(p, "palette");
await p.close();

// Desktop, light
p = await open("/", { theme: "light" });
await scrollTo(p, "#work article", -150);
await snap(p, "light");
await p.close();

// Case study
p = await open("/projects/deftgpt");
await snap(p, "case-study");
await p.close();

// Mobile
p = await open("/", { w: 390, h: 844, scale: 3 });
await snap(p, "mobile-hero");
await scrollTo(p, "#work article", -100);
await snap(p, "mobile-projects");
await p.close();

await browser.close();
rmSync(profileDir, { recursive: true, force: true });

try {
  for (const name of shots) {
    const size = name.startsWith("mobile") ? "1000" : "1600";
    execFileSync("sips", ["-Z", size, "-s", "format", "jpeg", "-s", "formatOptions", "82", `${OUT}${name}.png`, "--out", `${OUT}${name}.jpg`], { stdio: "ignore" });
    rmSync(`${OUT}${name}.png`);
  }
  console.log(`✓ ${shots.length} screenshots → .github/assets/*.jpg`);
} catch {
  console.log(`✓ ${shots.length} screenshots → .github/assets/*.png (sips unavailable — convert to .jpg manually)`);
}
