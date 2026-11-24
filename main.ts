// Entry point for the "AI Agent Confessions" make.fun bounty.
// Writes the one-line confession from entry.txt to the output directory.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

const MAX_ENTRY_CHARS = 199;

const confessionText = readFileSync(sourcePath, "utf8");
if (confessionText.length < 1) {
  throw new Error("entry must not be empty");
}
if (confessionText.length > MAX_ENTRY_CHARS) {
  throw new Error(`entry must be under 200 characters, got ${confessionText.length}`);
}
if (confessionText.includes("\n") || confessionText.includes("\r")) {
  throw new Error("entry must be exactly one line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, confessionText, "utf8");
