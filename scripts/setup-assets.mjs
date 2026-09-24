import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const publicDir = path.resolve(process.cwd(), "public");
fs.mkdirSync(publicDir, { recursive: true });

const DEFAULT_REPO_TAR = "https://github.com/munjurulahsan/asset/archive/refs/heads/main.tar.gz";
const targetUrl = process.argv[2] || process.env.ASSETS_URL || DEFAULT_REPO_TAR;

console.log(`[Assets Setup] Fetching assets from: ${targetUrl}`);

let success = false;

// 1. If it's the GitHub repository tarball
if (targetUrl.includes(".tar.gz")) {
  try {
    execSync(
      `curl -sSL "${targetUrl}" | tar -xz -C "${publicDir}" --strip-components=2 "asset-main/public-1"`,
      { stdio: "inherit" }
    );
    console.log("[Assets Setup] Successfully extracted GitHub assets into public/");
    success = true;
  } catch (err) {
    console.warn("[Assets Setup] Tar extraction failed:", err.message);
  }
} else if (targetUrl.endsWith(".zip")) {
  try {
    const tempZip = path.join(process.cwd(), "temp-assets.zip");
    execSync(`curl -sSL "${targetUrl}" -o "${tempZip}"`, { stdio: "inherit" });
    execSync(`unzip -qo "${tempZip}" -d "${publicDir}"`, { stdio: "inherit" });
    if (fs.existsSync(tempZip)) fs.unlinkSync(tempZip);
    console.log("[Assets Setup] Successfully extracted ZIP assets into public/");
    success = true;
  } catch (err) {
    console.warn("[Assets Setup] ZIP extraction failed:", err.message);
  }
}

// 2. Fallback check: verify required images exist
const imagesDir = path.join(publicDir, "images");
const iconsDir = path.join(publicDir, "icons");
fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(iconsDir, { recursive: true });

const requiredImages = [
  "showcase-shoe.png",
  "product-void-runner.png",
  "product-frame-fastener.png",
  "product-aero-form.png",
  "product-vector-shell.png",
  "pillar-form.png",
  "pillar-motion.png",
  "pillar-structure.png",
];

// A real (8×8, #131313) PNG — writing SVG markup into a .png file makes browsers
// reject the image, since they won't sniff SVG out of an image/png response.
const FALLBACK_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAD0lEQVR4nGMQxgEYhpYEAJITDkEiRLLrAAAAAElFTkSuQmCC",
  "base64",
);

for (const img of requiredImages) {
  const filePath = path.join(imagesDir, img);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, FALLBACK_PNG);
    console.log(`[Assets Setup] Created placeholder for ${img}`);
  }
}

const videoPath = path.join(imagesDir, "hero-video.mp4");
if (!fs.existsSync(videoPath)) {
  console.warn("[Assets Setup] hero-video.mp4 is missing — the hero will show its backdrop only.");
}

console.log("[Assets Setup] Ready. Assets are in place.");
